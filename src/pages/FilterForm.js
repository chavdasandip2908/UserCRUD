import React, { useState } from 'react';

const FilterForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: '',
    mobile: '',
    city: '',
    gender: ''
  });
  const [activeFilters, setActiveFilters] = useState({
    name: false,
    mobile: false,
    city: false,
    gender: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setActiveFilters({
      ...activeFilters,
      [name]: checked
    });
    if (!checked) {
      setFilters({
        ...filters,
        [name]: ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="container py-3 shadow-lg">
      <h1 className='text-center'>Filter Users</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="nameCheckbox"
            name="name"
            checked={activeFilters.name}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="nameCheckbox">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            disabled={!activeFilters.name}
            placeholder="Enter name"
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="ageCheckbox"
            name="mobile"
            checked={activeFilters.mobile}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="ageCheckbox">
            Mobile
          </label>
          <input
            type="number"
            className="form-control"
            id="ageInput"
            name="mobile"
            value={filters.mobile}
            onChange={handleInputChange}
            disabled={!activeFilters.mobile}
            placeholder="Enter mobile"
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="cityCheckbox"
            name="city"
            checked={activeFilters.city}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="cityCheckbox">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="cityInput"
            name="city"
            value={filters.city}
            onChange={handleInputChange}
            disabled={!activeFilters.city}
            placeholder="Enter city"
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="genderCheckbox"
            name="gender"
            checked={activeFilters.gender}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="genderCheckbox">
            Gender
          </label>
          <input
            type="text"
            className="form-control"
            id="genderInput"
            name="gender"
            value={filters.gender}
            onChange={handleInputChange}
            disabled={!activeFilters.gender}
            placeholder="Enter gender"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
