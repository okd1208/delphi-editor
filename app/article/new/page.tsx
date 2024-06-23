"use client";

import { useState } from 'react';
import axios from 'axios';
import ErrorModal from '../../../components/ErrorModal';

const ArticleNew: React.FC = () => {
  const [customTitleEnabled, setCustomTitleEnabled] = useState<boolean>(false);
  const [customPromptEnabled, setCustomPromptEnabled] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [minChars, setMinChars] = useState<number>(100);
  const [maxChars, setMaxChars] = useState<number>(10000);

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const showError = (msg: string): void => {
    setErrorMessage(msg);
    setIsError(true);
  };

  const handleCloseModal = (): void => {
    setIsError(false);
    setErrorMessage('');
  };

  const handleSubmit = async (): Promise<void> => {
    if (!notes || (customTitleEnabled && !title) || (customPromptEnabled && !prompt) || minChars < 100 || maxChars > 10000) {
      showError('入力項目に不備があります。');
      return;
    }

    const requestBody = {
      customTitleEnabled,
      title,
      customPromptEnabled,
      prompt,
      notes,
      minChars,
      maxChars
    };

    try {
      const response = await axios.post('http://localhost:8000/api/article/new', requestBody);
      if (response.status === 200) {
        const { id, titleSuggestions, compositionSuggestions } = response.data;
        // グローバル変数に設定する処理をここに書く
        const nextPath = customTitleEnabled ? '/article/edit/step2' : '/article/edit/step1';
        window.location.href = nextPath;
      } else {
        alert('エラーが発生しました。');
      }
    } catch (error) {
      alert('通信エラーが発生しました。');
    }
  };

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input
              type="checkbox"
              checked={customTitleEnabled}
              onChange={(e) => setCustomTitleEnabled(e.target.checked)}
              className="mr-2 leading-tight"
            />
            記事タイトルを自作する
          </label>
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!customTitleEnabled}
            placeholder="記事タイトル (最大100文字)"
            maxLength={100}
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${!customTitleEnabled ? 'bg-gray-200 cursor-not-allowed' : 'text-gray-700'}`}
          />
          <p className="text-gray-600 text-xs italic text-right">{title.length}/100 文字</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            学習メモ (最大10000文字):
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="学習メモ"
            maxLength={10000}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-80"
          />
          <p className="text-gray-600 text-xs italic text-right">{notes.length}/10000 文字</p>
        </div>
        <div className="flex items-start">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            最小文字数:
            <input
              type="number"
              value={minChars}
              onChange={(e) => setMinChars(Math.max(100, parseInt(e.target.value, 10)))}
              min="100"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2 ml-6">
            最大文字数:
            <input
              type="number"
              value={maxChars}
              onChange={(e) => setMaxChars(Math.min(10000, parseInt(e.target.value, 10)))}
              max="10000"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4 mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input
              type="checkbox"
              checked={customPromptEnabled}
              onChange={(e) => setCustomPromptEnabled(e.target.checked)}
              className="mr-2 leading-tight"
            />
            カスタムプロンプトを使用する
          </label>
        </div>
        <div className="mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={!customPromptEnabled}
            placeholder="カスタムプロンプト (最大10000文字)"
            maxLength={10000}
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-80 ${!customPromptEnabled ? 'bg-gray-200 cursor-not-allowed' : 'text-gray-700'}`}
          />
          <p className="text-gray-600 text-xs italic text-right">{prompt.length}/10000 文字</p>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            次のステップへ
          </button>
        </div>
      </form>
      {isError && (
        <ErrorModal message={errorMessage} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ArticleNew;
