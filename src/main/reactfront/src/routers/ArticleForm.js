import React, { useState } from 'react';
import axios from 'axios';

function ArticleForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/articles', {
                title: title,
                content: content
            });

            if (response.status === 201) {
                console.log('Article added successfully', response.data);
                // 기타 로직 (예: 폼 초기화, 알림 표시 등)
                setTitle('');
                setContent('');
            }
        } catch (error) {
            console.error('Error adding article', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ArticleForm;