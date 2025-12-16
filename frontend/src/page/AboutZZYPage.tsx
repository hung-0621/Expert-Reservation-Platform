import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loading from "../components/Loading";
import "../style/AboutZZYPage/AboutZZYPage.css";

interface AboutZZYData {
    name: string;
    image: string;
    title: string;
    education: string;
    experience: string;
    achievements: string;
    expertise: string;
    contact: string;
}

function AboutZZYPage() {
    const [datas, setDatas] = useState<AboutZZYData | null>(null);
    const [loading, setLoading] = useState(true);
    const data_path = "/json/about_zzy.json";
    
    useEffect(() => {
        fetch(data_path)
            .then(response => response.json())
            .then(data => {
                setDatas(data);
            })
            .catch(error => {
                console.error("Error loading about ZZY data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading />;
    if (!datas) return null;

    const expertiseList = datas.expertise.split('\n').filter(item => item.trim() !== '');

    return (
        <div className="zzy-page-container">
            {/* Hero Header */}
            <header className="zzy-header">
                <Container>
                    <div className="zzy-avatar-wrapper">
                        <img 
                            src={datas.image} 
                            alt={datas.name} 
                            className="zzy-avatar"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=ZZY';
                            }}
                        />
                    </div>
                    <h1 className="zzy-name">{datas.name}</h1>
                    <p className="zzy-title">{datas.title}</p>
                </Container>
            </header>

            <Container>
                <Row className="g-4">
                    {/* 左側欄位：學歷與經歷 */}
                    <Col lg={7}>
                        <div className="zzy-card">
                            <h3 className="section-title">🎓 傳奇學歷</h3>
                            <p className="zzy-text">{datas.education}</p>
                        </div>

                        <div className="zzy-card">
                            <h3 className="section-title">⚡ 覺醒經歷</h3>
                            <p className="zzy-text">{datas.experience}</p>
                        </div>

                        <div className="zzy-card">
                            <h3 className="section-title">🏆 帝國成就</h3>
                            <p className="zzy-text">{datas.achievements}</p>
                        </div>
                    </Col>

                    {/* 右側欄位：專業技能與聯絡方式 */}
                    <Col lg={5}>
                        <div className="zzy-card">
                            <h3 className="section-title">✨ 神之領域 (Expertise)</h3>
                            <div className="expertise-list">
                                {expertiseList.map((item, index) => {
                                    const parts = item.split('】');
                                    const title = parts.length > 1 ? parts[0] + '】' : '';
                                    const content = parts.length > 1 ? parts[1] : parts[0];

                                    return (
                                        <div key={index} className="expertise-item">
                                            {title && <span className="expertise-title">{title}</span>}
                                            <span>{content}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="zzy-card contact-card">
                            <h3 className="section-title" style={{color: '#ef4444', borderColor: '#ef4444'}}>🚫 聯絡方式</h3>
                            <p className="zzy-text contact-text">{datas.contact}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AboutZZYPage;