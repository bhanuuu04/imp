import { NextRequest, NextResponse } from 'next/server';
import { analyzeSocialMessage } from '@/lib/threat-engine';
import { DEFAULT_BRAND_REGISTRY } from '@/lib/store';
import { SenderProfile, SocialMessage, SocialPlatform } from '@/types/threat';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ platform: string }> }
) {
  const { platform } = await context.params;
  const searchParams = req.nextUrl.searchParams;

  // 1. Meta / Instagram Webhook Verification Handshake
  if (platform === 'instagram' || platform === 'facebook') {
    const hubMode = searchParams.get('hub.mode');
    const hubChallenge = searchParams.get('hub.challenge');
    const hubVerifyToken = searchParams.get('hub.verify_token');

    // Default verify token or custom brand secret
    if (hubMode === 'subscribe' && hubChallenge) {
      return new Response(hubChallenge, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }

  // 2. Twitter / X Webhook CRC Handshake
  if (platform === 'twitter' || platform === 'x_twitter') {
    const crcToken = searchParams.get('crc_token');
    if (crcToken) {
      // In production, sign using HMAC-SHA256 with Twitter Consumer Secret
      return NextResponse.json({
        response_token: `sha256_verified_${crcToken}`
      });
    }
  }

  return NextResponse.json({
    status: 'active',
    endpoint: `/api/webhooks/${platform}`,
    message: 'Astra Threat Ingestion Webhook Ready'
  });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ platform: string }> }
) {
  try {
    const { platform } = await context.params;
    const rawBody = await req.json();

    let extractedSender: SenderProfile;
    let extractedContent = '';
    let messageId = `live-${Date.now()}`;

    // Normalize incoming payloads across social providers
    if (platform === 'telegram') {
      const msg = rawBody.message || rawBody.channel_post || rawBody;
      const from = msg.from || {};
      extractedSender = {
        id: `tg-${from.id || 'unknown'}`,
        platform: 'telegram',
        username: from.username || `user_${from.id}`,
        displayName: `${from.first_name || ''} ${from.last_name || ''}`.trim() || 'Telegram User',
        avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        followerCount: 0,
        followingCount: 0,
        isVerifiedBadge: false,
        isFakeBadgeEmoji: false
      };
      extractedContent = msg.text || msg.caption || '';
    } else if (platform === 'instagram') {
      // Meta Messenger / Instagram Direct webhook structure
      const entry = rawBody.entry?.[0]?.messaging?.[0] || rawBody;
      extractedSender = {
        id: `ig-${entry.sender?.id || 'unknown'}`,
        platform: 'instagram',
        username: entry.sender?.username || `ig_user_${entry.sender?.id || 'ext'}`,
        displayName: entry.sender?.name || 'Instagram User',
        avatarUrl: 'https://images.unsplash.com/photo-1633409381658-a0cdef852895?w=150&auto=format&fit=crop&q=80',
        followerCount: entry.sender?.followers_count || 12,
        followingCount: entry.sender?.following_count || 450,
        isVerifiedBadge: false,
        isFakeBadgeEmoji: false
      };
      extractedContent = entry.message?.text || rawBody.text || '';
    } else {
      // Generic / Twitter / LinkedIn / Discord payload
      extractedSender = {
        id: `${platform}-${rawBody.sender?.id || Date.now()}`,
        platform: platform as SocialPlatform,
        username: rawBody.sender?.username || rawBody.username || 'unidentified_sender',
        displayName: rawBody.sender?.displayName || rawBody.displayName || 'Sender',
        avatarUrl: rawBody.sender?.avatarUrl || 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=150&auto=format&fit=crop&q=80',
        bio: rawBody.sender?.bio || '',
        followerCount: rawBody.sender?.followerCount || 0,
        followingCount: rawBody.sender?.followingCount || 0,
        isVerifiedBadge: Boolean(rawBody.sender?.isVerifiedBadge),
        isFakeBadgeEmoji: Boolean(rawBody.sender?.isFakeBadgeEmoji)
      };
      extractedContent = rawBody.content || rawBody.text || '';
    }

    // Run Astra Real-time AI Cybersecurity Threat Analysis Engine
    const threatAnalysis = analyzeSocialMessage(
      extractedContent,
      extractedSender,
      DEFAULT_BRAND_REGISTRY
    );

    const socialMessage: SocialMessage = {
      id: messageId,
      platform: platform as SocialPlatform,
      brandAccountId: DEFAULT_BRAND_REGISTRY.id,
      sender: extractedSender,
      content: extractedContent,
      timestamp: new Date().toISOString(),
      analysis: threatAnalysis,
      status: threatAnalysis.severity === 'critical' ? 'quarantined' : 'new'
    };

    return NextResponse.json({
      success: true,
      message: 'Payload ingested and analyzed by Astra Threat Engine',
      threatSeverity: threatAnalysis.severity,
      riskScore: threatAnalysis.riskScore,
      processedMessage: socialMessage
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
