import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function CategorySelector({
  categories = [],
  selectedCategoryId,
  onSelectCategory,
  allowRandom = true,
  isRandomSelected = false,
  onSelectRandom,
}) {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 px-1">
        <label className="text-white-50 small fw-bold text-uppercase" style={{ letterSpacing: '0.06em' }}>
          Choose Category (10 Questions)
        </label>
      </div>

      <Row className="g-2">
        {allowRandom && (
          <Col xs={6} sm={4} md={3}>
            <div
              className={`category-card h-100 ${isRandomSelected ? 'active' : ''}`}
              onClick={onSelectRandom}
              id="category-card-random"
            >
              <div className="category-icon-box">🎲</div>
              <div className="fw-bold text-white small">Random Mix</div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>All Categories</div>
            </div>
          </Col>
        )}

        {categories.map((cat) => {
          const isSelected = !isRandomSelected && selectedCategoryId === cat.id;
          return (
            <Col xs={6} sm={4} md={3} key={cat.id}>
              <div
                className={`category-card h-100 ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
                id={`category-card-${cat.slug}`}
              >
                <div className="category-icon-box">{cat.icon || '✨'}</div>
                <div className="fw-bold text-white small text-truncate">{cat.name}</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {cat.question_count || 20}+ Questions
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
