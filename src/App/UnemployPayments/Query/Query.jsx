import React from 'react'; 

import './Query.css';

const Query = ({onChangeIsParentOrAbove28, setAllSalaries}) => {
    const onChangeRadioButtons = () => {
        const isAbove28 = document.getElementById('above28').checked;
        const isParent =  document.getElementById('parent').checked;

        console.log("is above 28 or parent: " + isAbove28 || isParent);
        onChangeIsParentOrAbove28(isAbove28 || isParent);
    }

    const onChangeSalaries = () => {
        const s1 = parseInt(document.getElementById('Salary1').value);
        const s2 = parseInt(document.getElementById('Salary2').value);
        const s3 = parseInt(document.getElementById('Salary3').value);
        const s4 = parseInt(document.getElementById('Salary4').value);
        const s5 = parseInt(document.getElementById('Salary5').value);
        const s6 = parseInt(document.getElementById('Salary6').value);

        setAllSalaries([s1,s2,s3,s4,s5,s6]);
    }

    return (
        <div className="unemploy-container">
            <form className="form-container">
                <div>
                    <div className='radio-block'>
                        <div className="custom-control custom-radio">
                            <input type="radio" className="custom-control-input" id="above28" onClick={onChangeRadioButtons} name="isAbove28" checked />
                            <label className="custom-control-label" for="above28">מעל גיל 28</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" className="custom-control-input" id="under28" onClick={onChangeRadioButtons} name="isAbove28"  />
                            <label className="custom-control-label" for="under28">מתחת גיל 28</label>
                        </div>
                    </div>

                    <br />
                    <br />

                    <div className='radio-block'>
                        <div className="custom-control custom-radio">
                            <input type="radio" className="custom-control-input" id="parent" onClick={onChangeRadioButtons} name="isParent"  />
                            <label className="custom-control-label" for="parent">הורה עם ילדים</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" className="custom-control-input" id="notParent" onClick={onChangeRadioButtons} name="isParent" checked />
                            <label className="custom-control-label" for="notParent">ללא ילדים</label>
                        </div>
                    </div>
                </div>

                <div>
                    6 משכורות אחרונות:
                    <input type="number" className="salary-input form-control" onChange={onChangeSalaries} id="Salary1" />
                    <input type="number" className="salary-input form-control" onChange={onChangeSalaries} id="Salary2" />
                    <input type="number" className="salary-input form-control" onChange={onChangeSalaries} id="Salary3" />
                    <input type="number" className="salary-input form-control" onChange={onChangeSalaries} id="Salary4" />
                    <input type="number" className="salary-input form-control" onChange={onChangeSalaries} id="Salary5" />
                    <input type="number" className="salary-input form-control" onChange={onChangeSalaries} id="Salary6" />
                </div>
            </form>
        </div>
    );
};

export default Query;