import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loading from "../components/Loading";
import "../style/PlatformIntroPage/PlatformIntroPage.css";

interface PlatformIntroData {
    title: string;
    content: string;
    image: string;
}

function PlatformIntroPage() {
    const [datas, setDatas] = useState<PlatformIntroData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const data_path = "/json/platform_intro.json";

    useEffect(() => {
        fetch(data_path)
            .then(response => response.json())
            .then(data => {
                setDatas(data);
            })
            .catch(error => {
                console.error("Error loading platform intro data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="platform-intro-container">
            {/* 頁面標題區 */}
            <header className="intro-header">
                <Container>
                    <h1>關於 NexusLink</h1>
                    <p>連結專業，創造價值 —— 您的全方位專家預約夥伴</p>
                </Container>
            </header>

            {/* 主要內容區 */}
            <Container className="intro-section">
                {datas?.map((data, index) => (
                    <div className="intro-row" key={index}>
                        {/* 圖片區塊 */}
                        <div className="intro-image-wrapper">
                            <img 
                                src={data.image} 
                                alt={data.title} 
                                className="intro-image"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=No+Image';
                                }}
                            />
                        </div>

                        {/* 文字區塊 */}
                        <div className="intro-content-wrapper">
                            <h2 className="intro-title">{data.title}</h2>
                            <p className="intro-text">{data.content}</p>
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default PlatformIntroPage;