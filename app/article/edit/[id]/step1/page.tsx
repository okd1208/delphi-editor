"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ErrorModal from '../../../../../components/ErrorModal';

interface ArticleData {
  titleSuggestions: string[];
  learnNote: string;
  customPrompt: string;
}

type Props = {
  params: {
    id: string;
  };
};

const EditArticleStep1: React.FC<Props> = (props) => {
  const router = useRouter();
  const { id } = props.params;
  const [articleData, setArticleData] = useState<ArticleData>({ titleSuggestions: [], learnNote: '', customPrompt: '' });
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [learnNote, setLearnNote] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [showLearnNote, setShowLearnNote] = useState<boolean>(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState<boolean>(false);

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

  useEffect(() => {
    if (id) {
      // TODO: execute api
      // axios.get(`http://localhost:8000/api/article/edit/${id}/step1`)
      //   .then(response => {
      //     setArticleData(response.data);
      //     setLearnNote(response.data.learnNote);
      //     setCustomPrompt(response.data.customPrompt);
      //   })
      //   .catch(error => console.error('Error fetching article data:', error));
      setArticleData({ titleSuggestions: ["Redis負荷軽減。80%の負荷でも100%のパフォーマンスを実現する", "GCPでRedisの負荷軽減した時のメモ", "Redisの負荷軽減についてのメモ", "Redisの負荷軽減についてのメモ2", "Redisの負荷軽減についてのメモ3"], learnNote: "Learn note", customPrompt: "Custom prompt" });
      setLearnNote("Learn note");
      setCustomPrompt("Custom prompt");
    }
  }, [id]);

  const handleTitleSelection = (title: string) => {
    setSelectedTitle(title);
  };

  const handleSubmit = () => {
    if (!selectedTitle) return;
    // TODO: execute api
    // axios.post(`http://localhost:8000/api/article/edit/${id}/step1/complete`, { title: selectedTitle })
    //   .then(response => {
    //     if (response.status === 200) {
    //       router.push(`/article/edit/${id}/step2`);
    //     } else {
    //       showError('エラーが発生しました。');
    //     }
    //   })
    //   .catch(error => showError('通信エラーが発生しました。'));
    router.push(`/article/edit/${id}/step2`);
  };

  const handleRegenerate = () => {
    // TODO: execute api
    // axios.post(`http://localhost:8000/api/article/edit/${id}/step1/regenerate`, { learnNote, customPrompt })
    //   .then(response => {
    //     setArticleData(response.data);
    //   })
    //   .catch(error => showError('再生生に失敗しました。しばらく経ってお試しください。'));
    setArticleData({ titleSuggestions: ["ddd", "sssss", "eeee", "ccccc", "qqqq"], learnNote: learnNote, customPrompt: customPrompt });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold">タイトルを選択する:</h2>
        <div className="flex flex-wrap gap-2">
          {articleData.titleSuggestions.map(title => (
            <button
              key={title}
              onClick={() => handleTitleSelection(title)}
              className={`flex-grow text-sm p-2 rounded shadow-md text-left transition-colors duration-300 ${selectedTitle === title ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100'}`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <button onClick={() => setShowLearnNote(!showLearnNote)} className="block w-full text-left p-2 bg-gray-200 text-gray-700 font-semibold">
          学習メモを編集する
        </button>
        {showLearnNote && (
          <textarea
            id="learnNote"
            value={learnNote}
            onChange={(e) => setLearnNote(e.target.value)}
            className="w-full p-2 border border-gray-300 mt-2"
          />
        )}
      </div>
      <div className="mb-4">
        <button onClick={() => setShowCustomPrompt(!showCustomPrompt)} className="block w-full text-left p-2 bg-gray-200 text-gray-700 font-semibold">
          カスタムプロンプトを編集する
        </button>
        {showCustomPrompt && (
          <textarea
            id="customPrompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full p-2 border border-gray-300 mt-2"
          />
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedTitle}
          className={`px-4 py-2 rounded ${selectedTitle ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          次のステップへ
        </button>
        <button
          onClick={handleRegenerate}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-700 text-white rounded"
        >
          タイトル再生成
        </button>
      </div>
      {isError && (
        <ErrorModal message={errorMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EditArticleStep1;
