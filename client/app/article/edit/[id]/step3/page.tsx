"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ErrorModal from '../../../../../components/ErrorModal';

interface ArticleStep3Data {
  title: string;
  contentsByTocs: { [key: string]: { order: number; contents: string[] } };
  learnNote: string;
  customPrompt: string;
}

type Props = {
  params: {
    id: string;
  };
};

const EditArticleStep3: React.FC<Props> = (props) => {
  const router = useRouter();
  const { id } = props.params;
  const [articleStep3Data, setArticleStep3Data] = useState<ArticleStep3Data>({
    title: 'サンプルタイトル',
    contentsByTocs: {
      'TOC1': { order: 1, contents: ['<p>サンプルコンテンツ1</p>', '<p>サンプルコンテンツ2</p>'] },
      'TOC2': { order: 2, contents: ['<p>サンプルコンテンツ3</p>', '<p>サンプルコンテンツ4</p>'] }
    },
    learnNote: 'サンプル学習メモ',
    customPrompt: 'サンプルカスタムプロンプト'
  });
  const [selectedContents, setSelectedContents] = useState<{ [key: string]: string }>({});
  const [editedContents, setEditedContents] = useState<{ [key: string]: { [content: string]: string } }>({});
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
      // axios.get(`http://localhost:8000/api/article/edit/${id}/step3`)
      //   .then(response => {
      //     const { title, contentsByTocs, learnNote, customPrompt } = response.data;
      //     setArticleStep3Data({ title, contentsByTocs, learnNote, customPrompt });
      //     initializeSelectedContents(contentsByTocs);
      //     initializeEditedContents(contentsByTocs);
      //   })
      //   .catch(error => {
      //     showError('記事データの取得に失敗しました。');
      //     console.error('Error fetching article data:', error);
      //   });

      // テスト用のデータを設定
      initializeSelectedContents(articleStep3Data.contentsByTocs);
      initializeEditedContents(articleStep3Data.contentsByTocs);
    }
  }, [id]);

  const initializeSelectedContents = (contentsByTocs: { [key: string]: { order: number; contents: string[] } }): void => {
    const initialSelectedContents: { [key: string]: string } = {};
    Object.keys(contentsByTocs).forEach(toc => {
      initialSelectedContents[toc] = '';
    });
    setSelectedContents(initialSelectedContents);
  };

  const initializeEditedContents = (contentsByTocs: { [key: string]: { order: number; contents: string[] } }): void => {
    const initialEditedContents: { [key: string]: { [content: string]: string } } = {};
    Object.keys(contentsByTocs).forEach(toc => {
      initialEditedContents[toc] = contentsByTocs[toc].contents.reduce((acc, content) => {
        acc[content] = content;
        return acc;
      }, {} as { [content: string]: string });
    });
    setEditedContents(initialEditedContents);
  };

  const handleCheckboxChange = (toc: string, content: string): void => {
    setSelectedContents(prevState => ({
      ...prevState,
      [toc]: content
    }));
  };

  const handleContentChange = (toc: string, originalContent: string, newContent: string): void => {
    setEditedContents(prevState => ({
      ...prevState,
      [toc]: {
        ...prevState[toc],
        [originalContent]: newContent
      }
    }));
  };

  const handleSave = (): void => {
    // TODO: execute api
    // axios.post(`http://localhost:8000/api/article/edit/${id}/step3/save`, { contentsByTocs: selectedContents })
    //   .then(response => {
    //     console.log('途中保存が成功しました。');
    //   })
    //   .catch(error => {
    //     showError('途中保存中にエラーが発生しました。');
    //     console.error('Error saving article data:', error);
    //   });

    console.log('途中保存データ:', selectedContents);
  };

  const handleComplete = (): void => {
    const incompleteTOCs = Object.keys(articleStep3Data.contentsByTocs).filter(toc => !selectedContents[toc]);
    if (incompleteTOCs.length > 0) {
      showError(`以下の見出しに対してコンテンツが選択されていません: ${incompleteTOCs.join(', ')}`);
      return;
    }

    // TODO: execute api
    // axios.post(`http://localhost:8000/api/article/edit/${id}/step3/complete`, { selectedContents })
    //   .then(response => {
    //     if (response.status === 200) {
    //       router.push(`/article/edit/${id}/detail`);
    //     } else {
    //       showError('記事の完成処理中にエラーが発生しました。');
    //     }
    //   })
    //   .catch(error => {
    //     showError('記事の完成処理中に通信エラーが発生しました。');
    //     console.error('Error completing article:', error);
    //   });

    console.log('記事完成データ:', selectedContents);
    router.push(`/article/edit/${id}/detail`);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">{articleStep3Data.title}</h2>
      <div className="my-4">
        {Object.keys(articleStep3Data.contentsByTocs).sort((a, b) => articleStep3Data.contentsByTocs[a].order - articleStep3Data.contentsByTocs[b].order).map(toc => (
          <div key={toc} className="mb-4">
            <h3 className="text-md font-semibold">{toc}</h3>
            {articleStep3Data.contentsByTocs[toc].contents.map(content => (
              <div key={content} className="mb-2">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedContents[toc] === content}
                    onChange={() => handleCheckboxChange(toc, content)}
                    className="mr-2"
                  />
                  <div className="flex-grow border rounded p-2 bg-white">
                    <textarea
                      value={editedContents[toc]?.[content] || content}
                      onChange={(e) => handleContentChange(toc, content, e.target.value)}
                      className="w-full h-20 border border-gray-300 p-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <button onClick={() => setShowLearnNote(!showLearnNote)} className="block w-full text-left p-2 bg-gray-200 text-gray-700 font-semibold">
          学習メモを編集する
        </button>
        {showLearnNote && (
          <textarea
            id="learnNote"
            value={articleStep3Data.learnNote}
            onChange={(e) => setArticleStep3Data(prevState => ({ ...prevState, learnNote: e.target.value }))}
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
            value={articleStep3Data.customPrompt}
            onChange={(e) => setArticleStep3Data(prevState => ({ ...prevState, customPrompt: e.target.value }))}
            className="w-full p-2 border border-gray-300 mt-2"
          />
        )}
      </div>
      <div className="flex space-x-4">
        <button onClick={handleComplete} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">
          完成
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded">
          途中保存
        </button>
      </div>
      {isError && (
        <ErrorModal message={errorMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EditArticleStep3;
