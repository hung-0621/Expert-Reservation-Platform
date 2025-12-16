import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/LandingPage/LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();
    // 使用一張更具科技感與專業感的圖片
    const HERO_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    return (
        <div className="landing-page-container">
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center min-vh-100 py-5">
                        {/* 左側文案區 */}
                        <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
                            <div className="hero-badge mb-3">
                                <span className="badge-dot"></span>
                                專業媒合首選平台
                            </div>
                            
                            <h1 className="hero-title mb-4">
                                連結頂尖專家<br />
                                <span className="text-gradient">解決關鍵難題</span>
                            </h1>
                            
                            <p className="hero-subtitle mb-5">
                                NexusLink 匯聚各領域行業領袖，提供一對一專業諮詢。
                                無論是技術指導、職涯規劃或商業策略，都能在這裡找到答案。
                            </p>
                            
                            <div className="hero-btns d-flex gap-3 justify-content-center justify-content-lg-start">
                                <Button 
                                    className="btn-hero-primary"
                                    onClick={() => navigate('/expert')}
                                    size='lg'
                                >
                                    尋找專家
                                </Button>
                            </div>

                            <div className="hero-stats mt-5 d-flex gap-5 justify-content-center justify-content-lg-start">
                                <div className="stat-item">
                                    <h3>500+</h3>
                                    <p>認證專家</p>
                                </div>
                                <div className="stat-item">
                                    <h3>10k+</h3>
                                    <p>成功諮詢</p>
                                </div>
                            </div>
                        </Col>

                        {/* 右側圖片區 */}
                        <Col lg={6} className="position-relative">
                            <div className="hero-image-wrapper">
                                <div className="hero-blob"></div>
                                <img 
                                    src={HERO_IMAGE} 
                                    alt="Professional Team" 
                                    className="hero-image"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default LandingPage;