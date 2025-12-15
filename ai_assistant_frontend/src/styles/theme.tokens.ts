export type ColorTokens = {
  primary: { brand: string }
  success: string
  ai: {
    accent: string
    regenerateText: string
    panel: { bg: string; border: string }
  }
  background: { app: string; card: string }
  text: { neutral: string; secondary: string; onPrimary: string }
  border: { divider: string }
  compliance: { incompleteIcon: string }
}

export type ComponentVariants = {
  Button: {
    primary: { bg: string; text: string; border?: string }
    secondary: { bg: string; text: string; border: string }
    regenerate: { bg: string; text: string; border: string; rule: string }
    neutral: { bg: string; text: string; border: string }
  }
  Badge: {
    aiNew: { bg: string; text: string; border: string }
    info: { bg: string; text: string; border: string }
  }
  Card: {
    default: { bg: string; border: string }
    aiPanel: { bg: string; border: string }
  }
  Modal: {
    success: {
      bg: string
      icon: string
      caseNumber: string
      secondaryText: string
      primaryButton: { bg: string; text: string }
      secondaryButton: { bg: string; text: string; border: string }
    }
  }
  Alert: {
    success: { bg: string; text: string; border: string }
    neutral: { bg: string; text: string; border: string }
  }
  Compliance: {
    completedIcon: string
    incompleteIcon: string
    text: string
  }
}

export type Theme = {
  colors: ColorTokens
  components: ComponentVariants
  meta: {
    name: string
    principles: string[]
    typography: { headings: string[]; body: string }
    accessibility: { contrast: string[] }
    rules: string[]
  }
}

export const theme: Theme = {
  colors: {
    primary: { brand: '#2F3E5C' },
    success: '#2E7D32',
    ai: {
      accent: '#D6B56C',
      regenerateText: '#8A6A2E',
      panel: { bg: '#FBF9F3', border: 'rgba(214,181,108,0.2)' },
    },
    background: { app: '#F7F8FA', card: '#FFFFFF' },
    text: {
      neutral: '#374151',
      secondary: '#6B7280',
      onPrimary: '#FFFFFF',
    },
    border: { divider: '#E5E7EB' },
    compliance: { incompleteIcon: '#C0841A' },
  },
  components: {
    Button: {
      primary: {
        bg: '#2F3E5C',
        text: '#FFFFFF',
      },
      secondary: {
        bg: '#FFFFFF',
        text: '#2F3E5C',
        border: '#2F3E5C',
      },
      regenerate: {
        bg: 'transparent',
        text: '#8A6A2E',
        border: '#D6B56C',
        rule: 'AI accent is never used for destructive actions',
      },
      neutral: {
        bg: 'transparent',
        text: '#374151',
        border: '#E5E7EB',
      },
    },
    Badge: {
      aiNew: {
        bg: 'rgba(5,150,105,0.12)',
        text: '#2E7D32',
        border: 'rgba(5,150,105,0.35)',
      },
      info: {
        bg: 'rgba(47,62,92,0.10)',
        text: '#2F3E5C',
        border: 'rgba(47,62,92,0.25)',
      },
    },
    Card: {
      default: { bg: '#FFFFFF', border: '#E5E7EB' },
      aiPanel: { bg: '#FBF9F3', border: 'rgba(214,181,108,0.2)' },
    },
    Modal: {
      success: {
        bg: '#FFFFFF',
        icon: '#2E7D32',
        caseNumber: '#2F3E5C',
        secondaryText: '#6B7280',
        primaryButton: { bg: '#2F3E5C', text: '#FFFFFF' },
        secondaryButton: { bg: '#FFFFFF', text: '#2F3E5C', border: '#2F3E5C' },
      },
    },
    Alert: {
      success: {
        bg: 'rgba(46,125,50,0.10)',
        text: '#2E7D32',
        border: 'rgba(46,125,50,0.32)',
      },
      neutral: {
        bg: '#FFFFFF',
        text: '#374151',
        border: '#E5E7EB',
      },
    },
    Compliance: {
      completedIcon: '#2E7D32',
      incompleteIcon: '#C0841A',
      text: '#6B7280',
    },
  },
  meta: {
    name: 'Calm Warm Neutral',
    principles: [
      'Calm and low-stress visual language',
      'Trust and accuracy through restrained color',
      'Professional care, with AI as assistance',
    ],
    typography: {
      headings: ['Inter', 'Source Sans Pro'],
      body: 'Inter',
    },
    accessibility: [
      'Maintain AA contrast for text',
      'White text on #2F3E5C meets AA',
    ],
    rules: [
      'AI accent never used for destructive actions',
      'Prefer neutral text for non-primary actions',
    ],
  },
}

export default theme
