import React, { useEffect } from 'react';
import authService from '../backend-services/auth/auth';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const data = await authService.logout();
        console.log(data);
        if (data) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>Logging out...




<ul style={style}>
                    <li className="sr-look">
                      <div className="form-group">
                        <label>I'm looking for</label>
                        <select
                          className="chosen-select"
                          name="lookingFor"
                          value={formData.lookingFor}
                          onChange={handleChange}
                        >
                          <option value="">I'm looking for</option>
                          <option value="Male">
                            वर शोधत आहे (Looking for Groom)
                          </option>
                          <option value="Female">
                            वधू शोधत आहे (Looking for Bride)
                          </option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-age">
                      <div className="form-group">
                        <label>वय (Age)</label>
                        <select
                          className="chosen-select"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                        >
                          <option value="">वय (Age)</option>
                          <option value="18 to 22">18 to 22</option>
                          <option value="22 to 25">22 to 25</option>
                          <option value="25 to 30">25 to 30</option>
                          <option value="30 to 35">30 to 35</option>
                          <option value="35 to 40">35 to 40</option>
                          <option value="40 to 45">40 to 45</option>
                          <option value="45 to 50">45 to 50</option>
                          <option value="50 to 55">50 to 55</option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-reli">
  <div className="form-group">
    <label>धर्म (Religion)</label>
    <select
      className="chosen-select"
      name="religion"
      value={formData.religion}
      onChange={handleChange}
    >
      <option value="">धर्म (Religion)</option>
      <option value="Any">कोणताही (Any)</option>
      <option value="Hindu">हिंदू (Hindu)</option>
      <option value="Muslim">मुस्लिम (Muslim)</option>
      <option value="Buddhist">बौद्ध (Buddhist)</option>
      <option value="Jain">जैन (Jain)</option>
      <option value="Christian">ख्रिश्चन (Christian)</option>
      <option value="Sikh">शीख (Sikh)</option>
      <option value="Parsi">पारशी (Parsi/Zoroastrian)</option>
      <option value="Jewish">ज्यू (Jewish)</option>
      <option value="Other">इतर (Other - Tribal/Indigenous)</option>
    </select>
  </div>
</li>

<li className="sr">
      <div className="form-group">
        <label>Caste/Sub Caste</label>
        <select
          className="chosen-select"
          name="caste"
          value={formData.caste}
          
          onChange={() => {
            handleChange()
            handleCasteDropDownelect()
          }}
        >
          <option value=""  >Caste/Sub Caste</option>
          {casteOptions.map((caste) => (
            <option key={caste.value} value={caste.value}>
              {caste.label}
            </option>
          ))}
        </select>


        <div
          className="chosen-container chosen-container-single chosen-with-drop chosen-container-active"
          title=""
          style={{ width: 168 }}
        >
          <a className="chosen-single">
            <span>
              {casteOptions.find(option => option.value === formData.caste)?.label || "Caste/Sub Caste"}
            </span>
            <div>
              <b />
            </div>
          </a>
          <div className="chosen-drop">
            <div className="chosen-search">
              <input className="chosen-search-input" type="text" autoComplete="off" />
            </div>
            <ul className="chosen-results">
              {casteOptions.map((caste) => (
                <li
                  key={caste.value}
                  className={`active-result ${formData.caste === caste.value ? 'result-selected highlighted' : ''}`}
                  onClick={() => handleChange({ target: { name: 'caste', value: caste.value } })}
                >
                  {caste.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>

{/* Render Caste/Sub Caste only if the selected religion is not "Any" */}
{/* {formData.religion !== "Any" && (
  <li className="sr-cit">
    <div className="form-group">
      <label>Caste/Sub Caste</label>
      <select
        className="chosen-select"
        name="caste"
        value={formData.caste}
        onChange={handleChange}
      >
        <option value="">Caste/Sub Caste</option>
        {formData.religion && religionCasteMap[formData.religion]?.caste?.map((caste) => (
          <option key={caste.value} value={caste.value}>
            {caste.label}
          </option>
        ))}
      </select>


<div
  className="chosen-container chosen-container-single chosen-with-drop chosen-container-active"
  title=""
  style={{ width: 168 }}
>
  <a className="chosen-single">
    <span>Caste/Sub Caste</span>
    <div>
      <b />
    </div>
  </a>
  <div className="chosen-drop">
    <div className="chosen-search">
      <input className="chosen-search-input" type="text" autoComplete="off" />
    </div>
    <ul className="chosen-results">
      <li 
        className="active-result result-selected highlighted"
        data-option-array-index={0}
      >
        caste1
      </li>
      <li className="active-result" data-option-array-index={1}>
      caste2
      </li>

    </ul>
  </div>
</div>

    </div>
  </li>
)} */}


                    <li className="sr-cit">
                      <div className="form-group">
                        <label>City</label>
                        <select
                          className="chosen-select"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          <option value="">स्थान (Location)</option>
                          <option value="Any location">Any location</option>
                          <option value="Chennai">Chennai</option>
                          <option value="New york">New york</option>
                          <option value="Perth">Perth</option>
                          <option value="London">London</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-btn">
                      <input type="submit" value="Search" />
                    </li>
                  </ul>

























                  <ul style={style}>
                    <li className="sr-look">
                      <div className="form-group">
                        <label>I'm looking for</label>
                        <select
                          className="chosen-select"
                          name="lookingFor"
                          value={formData.lookingFor}
                          onChange={handleChange}
                        >
                          <option value="">I'm looking for</option>
                          <option value="Male">
                            वर शोधत आहे (Looking for Groom)
                          </option>
                          <option value="Female">
                            वधू शोधत आहे (Looking for Bride)
                          </option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-age">
                      <div className="form-group">
                        <label>वय (Age)</label>
                        <select
                          className="chosen-select"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                        >
                          <option value="">वय (Age)</option>
                          <option value="18 to 22">18 to 22</option>
                          <option value="22 to 25">22 to 25</option>
                          <option value="25 to 30">25 to 30</option>
                          <option value="30 to 35">30 to 35</option>
                          <option value="35 to 40">35 to 40</option>
                          <option value="40 to 45">40 to 45</option>
                          <option value="45 to 50">45 to 50</option>
                          <option value="50 to 55">50 to 55</option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-reli">
  <div className="form-group">
    <label>धर्म (Religion)</label>
    <select
      className="chosen-select"
      name="religion"
      value={formData.religion}
      onChange={handleChange}
    >
      <option value="">धर्म (Religion)</option>
      <option value="Any">कोणताही (Any)</option>
      <option value="Hindu">हिंदू (Hindu)</option>
      <option value="Muslim">मुस्लिम (Muslim)</option>
      <option value="Buddhist">बौद्ध (Buddhist)</option>
      <option value="Jain">जैन (Jain)</option>
      <option value="Christian">ख्रिश्चन (Christian)</option>
      <option value="Sikh">शीख (Sikh)</option>
      <option value="Parsi">पारशी (Parsi/Zoroastrian)</option>
      <option value="Jewish">ज्यू (Jewish)</option>
      <option value="Other">इतर (Other - Tribal/Indigenous)</option>
    </select>
  </div>
</li>

<li className="sr">
      <div className="form-group">
        <label>Caste/Sub Caste</label>
        <select
          className="chosen-select"
          name="caste"
          value={formData.caste}
          
          onChange={() => {
            handleChange()
            handleCasteDropDownelect()
          }}
        >
          <option value=""  >Caste/Sub Caste</option>
          {casteOptions.map((caste) => (
            <option key={caste.value} value={caste.value}>
              {caste.label}
            </option>
          ))}
        </select>


        <div
          className="chosen-container chosen-container-single chosen-with-drop chosen-container-active"
          title=""
          style={{ width: 168 }}
        >
          <a className="chosen-single">
            <span>
              {casteOptions.find(option => option.value === formData.caste)?.label || "Caste/Sub Caste"}
            </span>
            <div>
              <b />
            </div>
          </a>
          <div className="chosen-drop">
            <div className="chosen-search">
              <input className="chosen-search-input" type="text" autoComplete="off" />
            </div>
            <ul className="chosen-results">
              {casteOptions.map((caste) => (
                <li
                  key={caste.value}
                  className={`active-result ${formData.caste === caste.value ? 'result-selected highlighted' : ''}`}
                  onClick={() => handleChange({ target: { name: 'caste', value: caste.value } })}
                >
                  {caste.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>

{/* Render Caste/Sub Caste only if the selected religion is not "Any" */}
{/* {formData.religion !== "Any" && (
  <li className="sr-cit">
    <div className="form-group">
      <label>Caste/Sub Caste</label>
      <select
        className="chosen-select"
        name="caste"
        value={formData.caste}
        onChange={handleChange}
      >
        <option value="">Caste/Sub Caste</option>
        {formData.religion && religionCasteMap[formData.religion]?.caste?.map((caste) => (
          <option key={caste.value} value={caste.value}>
            {caste.label}
          </option>
        ))}
      </select>


<div
  className="chosen-container chosen-container-single chosen-with-drop chosen-container-active"
  title=""
  style={{ width: 168 }}
>
  <a className="chosen-single">
    <span>Caste/Sub Caste</span>
    <div>
      <b />
    </div>
  </a>
  <div className="chosen-drop">
    <div className="chosen-search">
      <input className="chosen-search-input" type="text" autoComplete="off" />
    </div>
    <ul className="chosen-results">
      <li 
        className="active-result result-selected highlighted"
        data-option-array-index={0}
      >
        caste1
      </li>
      <li className="active-result" data-option-array-index={1}>
      caste2
      </li>

    </ul>
  </div>
</div>

    </div>
  </li>
)} */}


                    <li className="sr-cit">
                      <div className="form-group">
                        <label>City</label>
                        <select
                          className="chosen-select"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          <option value="">स्थान (Location)</option>
                          <option value="Any location">Any location</option>
                          <option value="Chennai">Chennai</option>
                          <option value="New york">New york</option>
                          <option value="Perth">Perth</option>
                          <option value="London">London</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-btn">
                      <input type="submit" value="Search" />
                    </li>
                  </ul>



    </div>
  );
}

export default Logout;
