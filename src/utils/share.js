/**
 * Utilities for sharing quiz results and links across social channels.
 */

export function getQuizPublicUrl(publicId) {
  const origin = window.location.origin;
  return `${origin}/q/${publicId}`;
}

export function shareToWhatsApp({ creatorName, score, total = 10, publicId }) {
  const quizUrl = getQuizPublicUrl(publicId);
  const text = `I scored ${score}/${total} on How Well Do You Know ${creatorName || 'Me'}? 😎\nCan you beat my score? 🔥\n\nTake the quiz here:\n${quizUrl}`;
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

export function shareQuizInviteToWhatsApp({ creatorName, quizTitle, publicId }) {
  const quizUrl = getQuizPublicUrl(publicId);
  const text = `👀 How well do you really know ${creatorName || 'me'}?\nTake my 10-question quiz: "${quizTitle || 'How Well Do You Know Me?'}" and let's find out!\n\nPlay now:\n${quizUrl}`;
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

export async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return true;
    } catch {
      textArea.remove();
      return false;
    }
  }
}

export async function triggerNativeShare({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || 'How Well Do You Know Me?',
        text: text || 'Take my quiz to see how well you know me!',
        url: url || window.location.href,
      });
      return true;
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share error:', err);
      }
      return false;
    }
  }
  return false;
}
