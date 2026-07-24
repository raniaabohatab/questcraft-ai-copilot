import type { GenerationResponse } from '../types/generation'

/** Example session event used for the demo / fallback scenario. */
export const DEMO_SESSION_EVENT =
  'The heroes offered honey cakes to the Stormbristle Boar instead of fighting it. The boar sniffed the cakes, then sat down and looked at them curiously.'

/**
 * Clearly labeled demo output for the Stormbristle Boar scenario.
 * Used when no Anthropic API key is configured so the app stays demoable.
 */
export const DEMO_RESPONSE: GenerationResponse = {
  isDemo: true,
  outcomes: [
    {
      title: 'A Grateful Guide',
      description:
        'The Stormbristle Boar accepts the offering and trots ahead, leading the heroes along a mossy path toward a hidden spring of Athena. Along the way it snorts warnings about loose stones and low branches, becoming an unexpected — and slightly stubborn — trail companion.',
    },
    {
      title: 'A Gift of Bristles',
      description:
        'Pleased by the honey cakes, the boar shakes out three golden bristles that shimmer like tiny lightning bolts. Each hero who keeps a bristle can later call for a flash of light to reveal secret doors or scare away mischievous sprites — once each.',
    },
    {
      title: 'An Invitation to the Grove',
      description:
        'The boar bows its head and invites the party to its sacred grove, where dryads are weaving a festival wreath for Artemis. The heroes may join the celebration, earn a blessing of sure footing, and hear a rumor about a missing olive branch of peace.',
    },
  ],
  narration:
    'The Stormbristle Boar noses the honey cakes, then sits with a soft thump that makes the olive leaves tremble. For a moment the forest holds its breath — then the boar’s eyes brighten, warm as hearth-fire. It rises, turns toward a sunlit path, and glances back as if to say, “Well? Are you coming?” The wind carries a faint scent of honey and wild thyme, and the adventure opens a gentler door.',
  consequence:
    'Word spreads among the woodland spirits that these heroes choose kindness over conflict — later, a shy nymph may seek them out when a stolen festival harp needs recovering.',
  safetyNote:
    'Age-appropriate for ages 9–12: gentle wonder, no violence, and a focus on friendship and curiosity.',
}
