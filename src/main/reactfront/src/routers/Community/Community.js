import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Community() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // 데이터를 가져옵니다.
        axios.get('http://localhost:8080/select')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);  // 빈 의존성 배열을 사용하여 마운트 시 한 번만 실행

    return (
        <div>
            <h1>커뮤니티페이지</h1>
            <ul>
                {data.map(item => (
                    <li key={item.demo_id}>
                        {item.demo_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Community;