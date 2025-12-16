import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import ExpertCard from "../components/ExpertCard";
import { asyncGet } from "../utils/fetch";
import { expert_api } from "../api/api";
import type { Expert } from "../interface/Expert";
import Loading from "../components/Loading";
import "../style/ExpertPage/ExpertPage.css";

function ExpertPage() {
    const [experts, setExperts] = useState<Array<Expert>>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("default"); // default, price-asc, price-desc

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const response = await asyncGet(expert_api.LIST, {});
                if (response.code === 200) {
                    const expertsList = response.data.experts || [];
                    setExperts(Array.isArray(expertsList) ? expertsList : []);
                }
            } catch (error) {
                console.error("Error fetching experts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperts();
    }, []);

    const categories = useMemo(() => {
        const cats = new Set(experts.map(e => e.category));
        return ["All", ...Array.from(cats)];
    }, [experts]);

    const filteredExperts = useMemo(() => {
        let result = [...experts];

        if (searchTerm) {
            result = result.filter(expert => 
                expert.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter(expert => expert.category === selectedCategory);
        }

        // 排序價格
        if (sortOrder === "price-asc") {
            result.sort((a, b) => parseFloat(String(a.hourly_rate)) - parseFloat(String(b.hourly_rate)));
        } else if (sortOrder === "price-desc") {
            result.sort((a, b) => parseFloat(String(b.hourly_rate)) - parseFloat(String(a.hourly_rate)));
        }

        return result;
    }, [experts, searchTerm, selectedCategory, sortOrder]);

    return (
        <Container className="expert-page-container py-5">
            <div className="page-header">
                <h1 className="page-title">尋找您的專家</h1>
                <p className="page-subtitle">連結頂尖專業人士，滿足您的需求。</p>
            </div>

            {/* 控制列：搜尋、分類、排序 */}
            <div className="filter-section">
                <Row className="g-4">
                    <Col md={4}>
                        <label className="filter-label">搜尋</label>
                        <InputGroup className="custom-input-group">
                            <InputGroup.Text>
                                🔍
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="搜尋專家姓名..."
                                className="custom-search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <label className="filter-label">分類</label>
                        <Form.Select 
                            className="custom-select"
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === "All" ? "所有分類" : cat}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <label className="filter-label">排序方式</label>
                        <Form.Select 
                            className="custom-select"
                            value={sortOrder} 
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">推薦排序</option>
                            <option value="price-asc">價格：由低到高</option>
                            <option value="price-desc">價格：由高到低</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>

            {/* 顯示內容 */}
            {loading ? (
                <Loading />
            ) : (
                <ExpertCard experts={filteredExperts} />
            )}
        </Container>
    );
}

export default ExpertPage;