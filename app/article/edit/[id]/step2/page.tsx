"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ErrorModal from '../../../../../components/ErrorModal';

interface TOCSuggestion {
  tocTitle: string;
  suggestions: string[];
}

interface ArticleData {
  title: string;
  tocSuggestions: TOCSuggestion[];
  learnNote: string;
  customPrompt: string;
}

type Props = {
  params: {
    id: string;
  };
};

const EditArticleStep2: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [articleData, setArticleData] = useState<ArticleData>({ title: '', tocSuggestions: [], learnNote: '', customPrompt: '' });
  const [selectedTOCs, setSelectedTOCs] = useState<string[]>(new Array(4).fill(''));
  const [tocInputs, setTocInputs] = useState<string[]>(new Array(4).fill(''));
  const [isExpanded, setIsExpanded] = useState<boolean[]>(new Array(4).fill(true)); // All expanded initially
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
    // TODO: execute api
    // axios.get(`http://localhost:8000/api/article/edit/${id}/step2`)
    //   .then(response => {
    //     setArticleData(response.data);
    //     setIsExpanded(new Array(response.data.tocSuggestions.length).fill(false));
    //   })
    //   .catch(error => {
    //     console.error('Error fetching article data:', error);
    //     showError('データの取得に失敗しました。');
    //   });
    const testData = {
      title: 'Example Title',
      tocSuggestions: [
        { tocTitle: 'Introduction', suggestions: ['Intro Option 1', 'Intro Option 2', 'Intro Option 3'] },
        { tocTitle: 'Development', suggestions: ['Dev Option 1', 'Dev Option 2', 'Dev Option 3'] },
        { tocTitle: 'Deployment', suggestions: ['Deploy Option 1', 'Deploy Option 2', 'Deploy Option 3'] },
        { tocTitle: 'Conclusion', suggestions: ['Conclusion Option 1', 'Conclusion Option 2', 'Conclusion Option 3'] }
      ],
      learnNote: 'Example Learn Note',
      customPrompt: 'Example Custom Prompt'
    };
    setArticleData(testData);
    setIsExpanded(new Array(testData.tocSuggestions.length).fill(false));
  }, [id]);

  const toggleExpand = (index: number) => {
    const newExpanded = [...isExpanded];
    newExpanded[index] = !newExpanded[index];
    setIsExpanded(newExpanded);
  };

  const handleTOCSelection = (index: number, tocTitle: string) => {
    const updatedTOCs = [...selectedTOCs];
    updatedTOCs[index] = tocTitle;
    setSelectedTOCs(updatedTOCs);
    const updatedInputs = [...tocInputs];
    updatedInputs[index] = tocTitle;
    setTocInputs(updatedInputs);
    toggleExpand(index);
  };

  const handleTOCEdit = (index: number, value: string) => {
    const updatedInputs = [...tocInputs];
    updatedInputs[index] = value;
    setTocInputs(updatedInputs);
  };

  const handleTOCSaveEdit = (index: number) => {
    const updatedTOCs = [...articleData.tocSuggestions];
    const selectedOption = tocInputs[index];
    updatedTOCs[index].suggestions = updatedTOCs[index].suggestions.map(title => title === selectedTOCs[index] ? selectedOption : title);
    setArticleData({ ...articleData, tocSuggestions: updatedTOCs });
    handleTOCSelection(index, selectedOption);
  };

  const handleNextStep = () => {
    if (selectedTOCs.length === articleData.tocSuggestions.length && !selectedTOCs.includes('')) {
      // TODO: execute api
      // axios.post(`http://localhost:8000/api/article/edit/${id}/step2/complete`, { selectedTOCs })
      //   .then(response => {
      //     if (response.status === 200) {
      //       router.push(`/article/edit/${id}/step3`);
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error completing step:', error);
      //     showError('ステップ完了の処理に失敗しました。');
      //   });
    }
    router.push(`/article/edit/${id}/step3`);
  };

  const handleRegenerate = () => {
    // TODO: execute api
    // axios.post(`http://localhost:8000/api/article/edit/${id}/step2/regenerate`, { learnNote: articleData.learnNote, customPrompt: articleData.customPrompt })
    //   .then(response => {
    //     setArticleData({...articleData, ...response.data});
    //   })
    //   .catch(error => {
    //     console.error('Error regenerating content:', error);
    //     showError('コンテンツ再生成に失敗しました。');
    //   });
  };

  const handleSave = () => {
    // TODO: execute api
    // axios.post(`http://localhost:8000/api/article/edit/${id}/step2/save`, { selectedTOCs })
    //   .catch(error => {
    //     console.error('Error saving data:', error);
    //     showError('データの保存に失敗しました。');
    //   });
  };

  return (
    <div className="p-4 space-y-4">
      {articleData.tocSuggestions.map((toc, index) => (
        <div key={index} className="space-y-2">
          <h2 className="text-lg font-bold">TOC {index + 1}:</h2>
          <div className="flex flex-col gap-2">
            {toc.suggestions.map((suggestion, sIndex) => (
              <button
                key={sIndex}
                onClick={() => handleTOCSelection(index, suggestion)}
                className={`w-full text-sm p-2 rounded shadow-md text-left transition-colors duration-300 ${selectedTOCs[index] === suggestion ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100'}`}
              >
                {suggestion}
              </button>
            ))}
            <input
              type="text"
              value={tocInputs[index]}
              onChange={(e) => handleTOCEdit(index, e.target.value)}
              onBlur={() => handleTOCSaveEdit(index)}
              className="w-full p-2 border border-gray-300"
              placeholder="Edit TOC option here"
            />
          </div>
        </div>
      ))}
      <button onClick={handleNextStep} className={`px-4 py-2 rounded ${!selectedTOCs.includes('') ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>次のステップへ</button>
      <button onClick={handleRegenerate} className="px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded">見出しを再生成する</button>
      <button onClick={handleSave} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded">途中保存</button>
      {isError && (
        <ErrorModal message={errorMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EditArticleStep2;
