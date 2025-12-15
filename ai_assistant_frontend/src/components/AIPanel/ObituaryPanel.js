import React from 'react'
import '../../styles/theme.css'
import { theme } from '../../styles/theme.tokens.ts'

/**
 * PUBLIC_INTERFACE
 * ObituaryPanel
 * Renders an AI Generated Obituary panel with:
 * - Badge header "AI Generated Obituary" and a small "New" badge
 * - Content heading "Sample Obituary Draft" and exact mock text paragraphs
 * - Buttons row: "Copy", "Edit in Word" (neutral outline), "Regenerate" (AI accent outline)
 * - Disclaimer text below buttons in smaller secondary text
 * - AI panel background and border from theme tokens (ai.panel bg, Warm Sand Gold border at ~20% opacity)
 */
function ObituaryPanel() {
  const aiCardStyle = {
    background: theme.components.Card.aiPanel.bg,
    border: `1px solid ${theme.components.Card.aiPanel.border}`,
    borderRadius: 12,
    padding: 16,
  }

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 800,
    color: 'var(--color-primary)',
  }

  const newBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 999,
    padding: '2px 8px',
    fontSize: 12,
    fontWeight: 700,
    background: theme.components.Badge.aiNew.bg,
    color: theme.components.Badge.aiNew.text,
    border: `1px solid ${theme.components.Badge.aiNew.border}`,
  }

  const headingStyle = {
    margin: '10px 0 4px',
    fontWeight: 700,
    color: 'var(--color-text)',
    fontSize: 16,
  }

  const subtextStyle = {
    margin: '0 0 12px',
    fontSize: 14,
    color: 'var(--color-muted)',
  }

  const contentRegionStyle = {
    background: '#fff',
    border: `1px solid var(--border-color)`,
    borderRadius: 10,
    padding: 12,
    maxHeight: 260,
    overflow: 'auto',
  }

  const pStyle = { margin: '0 0 10px', color: 'var(--color-text)', lineHeight: 1.6, fontSize: 14 }

  const actionsRowStyle = {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  }

  const btnNeutral = {
    background: theme.components.Button.neutral.bg,
    color: theme.components.Button.neutral.text,
    border: `1px solid ${theme.components.Button.neutral.border}`,
    borderRadius: 8,
    padding: '8px 12px',
    fontWeight: 600,
    cursor: 'pointer',
  }

  const btnRegenerate = {
    background: theme.components.Button.regenerate.bg,
    color: theme.components.Button.regenerate.text,
    border: `1px solid ${theme.components.Button.regenerate.border}`,
    borderRadius: 8,
    padding: '8px 12px',
    fontWeight: 700,
    cursor: 'pointer',
  }

  const disclaimerStyle = {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 6,
  }

  const handleCopy = () => {
    try {
      const text = [
        'Johnathan “John” A. Doe, 78, of Oceanside, passed away peacefully on March 3, 2025.',
        '',
        'Born on July 12, 1946 in Portland, John dedicated his life to family, service, and community. He was a loving husband, devoted father, and proud grandfather who found joy in the simple things—sunrise walks along the shore, tinkering in the garage, and cheering on his children and grandchildren in all they pursued.',
        '',
        'John served honorably in the U.S. Navy and later spent over 30 years working as an engineer, where he was known for his steady leadership, practical wisdom, and a kind humor that made colleagues feel like family. He volunteered with local veterans’ groups, mentored young tradespeople, and believed deeply in doing the right thing—quietly and consistently.',
        '',
        'He is survived by his wife, Mary; his children, Daniel (Claire) and Amy (Thomas); and his grandchildren, Noah and Elise, who brought him immeasurable joy. He is also survived by his sister, Carol, and many extended family members and friends who will miss him dearly.',
        '',
        'A celebration of John’s life will be held on Saturday, March 15, 2025 at 11:00 a.m. at Oceanside Chapel, with visitation one hour prior. In lieu of flowers, the family suggests donations to the Oceanside Veterans Fund or a charity of your choice.',
        '',
        'John will be remembered for his gentle strength, hardworking spirit, and unwavering love for his family. His legacy lives on in those he quietly encouraged, faithfully served, and dearly loved.',
      ].join('\n')
      navigator.clipboard.writeText(text)
    } catch (e) {
      // silent in this template
    }
  }

  const handleEditInWord = () => {
    // Placeholder: integration with Word/Office would go here
    // For preview, we simply no-op.
  }

  const handleRegenerate = () => {
    // Placeholder: trigger AI regenerate
    // No-op for preview.
  }

  return (
    <section className="card panel" style={aiCardStyle} aria-label="AI Generated Obituary Panel">
      <div style={badgeStyle}>
        <span>AI Generated Obituary</span>
        <span style={newBadgeStyle} aria-label="New badge">New</span>
      </div>

      <div style={headingStyle}>Sample Obituary Draft</div>
      <div style={subtextStyle}>This draft reflects details commonly shared during arrangement meetings and is intended for demonstration purposes only.</div>

      <div role="region" aria-label="AI obituary content" style={contentRegionStyle}>
        <p style={pStyle}>
          [Full Name], [Age], of [City/Community], passed away on [Date of Passing]. Born on [Date of Birth] in [Place of Birth], [First Name] will be remembered for [positive personal qualities or values], [relationships to family], and [notable passions or contributions].
        </p>
        <p style={pStyle}>
          [First Name] is survived by [list immediate family and close loved ones, with relationships]. [He/She/They] was preceded in death by [names and relationships, if applicable]. [First Name]’s life was marked by [brief highlights—career, service, community, faith, or personal milestones], and [he/she/they] will be dearly missed by all who knew [him/her/them].
        </p>
        <p style={pStyle}>
          A [service type] will be held on [service date] at [time] at [location], with [visitation/gathering] beginning at [time, if applicable]. In lieu of flowers, the family invites memorial contributions to [charity or cause], or a charity of your choice, in honor of [First Name]’s [value or passion].
        </p>
        <p style={pStyle}>
          The family extends heartfelt thanks to [care team, community, or organization] for their support and care. [First Name] will be remembered for [signature trait or legacy], and [his/her/their] memory will continue to inspire those [he/she/they] loved.
        </p>
      </div>

      <div style={actionsRowStyle} role="group" aria-label="AI obituary actions">
        <button style={btnNeutral} onClick={handleCopy} aria-label="Copy obituary">Copy</button>
        <button style={btnNeutral} onClick={handleEditInWord} aria-label="Edit in Word">Edit in Word</button>
        <button style={btnRegenerate} onClick={handleRegenerate} aria-label="Regenerate obituary">Regenerate</button>
      </div>

      <div style={disclaimerStyle}>
        AI generated content is a draft for review only and does not represent final published material.
      </div>
    </section>
  )
}

export default ObituaryPanel
