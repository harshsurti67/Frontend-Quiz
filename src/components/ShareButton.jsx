import React, { useState } from 'react';
import { shareToWhatsApp, copyToClipboard, triggerNativeShare, getQuizPublicUrl } from '../utils/share';

export default function ShareButton({
  creatorName = 'Prem',
  score = 8,
  total = 10,
  publicId = 'WQme30Q',
  variant = 'result', // 'result' or 'invite'
  quizTitle = 'How Well Do You Know Me?',
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = getQuizPublicUrl(publicId);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    const url = getQuizPublicUrl(publicId);
    const text = variant === 'result'
      ? `I scored ${score}/${total} on How Well Do You Know ${creatorName}? 😎 Can you beat my score?`
      : `👀 How well do you really know ${creatorName}? Take my 10-question quiz: "${quizTitle}"`;
    
    const shared = await triggerNativeShare({
      title: quizTitle,
      text: text,
      url: url,
    });

    if (!shared) {
      // Fallback to WhatsApp
      shareToWhatsApp({ creatorName, score, total, publicId });
    }
  };

  const handleWhatsApp = () => {
    shareToWhatsApp({ creatorName, score, total, publicId });
  };

  return (
    <div className="d-flex flex-column gap-2 w-100">
      <button
        type="button"
        className="btn-whatsapp w-100 py-3 fs-5"
        onClick={handleWhatsApp}
        id="share-whatsapp-btn"
      >
        <i className="bi bi-whatsapp fs-4"></i>
        <span>Share on WhatsApp</span>
      </button>

      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn-social-secondary flex-grow-1 py-3"
          onClick={handleNativeShare}
          id="share-native-btn"
        >
          <i className="bi bi-share-fill"></i>
          <span>Share Result</span>
        </button>

        <button
          type="button"
          className="btn-social-secondary flex-grow-1 py-3"
          onClick={handleCopy}
          id="copy-link-btn"
        >
          <i className={`bi ${copied ? 'bi-check2-circle text-success' : 'bi-link-45deg'} fs-5`}></i>
          <span>{copied ? 'Link Copied! 🎉' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}
