import React, { useState } from "react";
import Select from "react-select";
const { cartesianProduct } = require('cartesian-product-multiple-arrays');

const attributesList = [
    {
        key: "color",
        value: "color",
        label: "Color",
        option: [
            { key: "red", value: "red", label: "Red" },
            { key: "blue", value: "blue", label: "Blue" },
            { key: "green", value: "green", label: "Green" },
        ],
        selectValues: [],
    },
    {
        key: "men",
        value: "men",
        label: "Menr",
        option: [
            { key: "jenis", value: "jenis", label: "jenis" },
            { key: "kushal", value: "kushal", label: "kushal" },
            { key: "kushal1", value: "kushal1", label: "kushal1" },
        ],
        selectValues: [],
    },

    {
        key: "size",
        value: "size",
        label: "Size",
        option: [
            { key: "small", value: "small", label: "Small" },
            { key: "medium", value: "medium", label: "Medium" },
            { key: "large", value: "large", label: "Large" },
        ],
        selectValues: [],
    },
    {
        key: "material",
        value: "material",
        label: "Material",
        option: [
            { key: "leather", value: "leather", label: "Leather" },
            { key: "cotton", value: "cotton", label: "Cotton" },
            { key: "polyester", value: "polyester", label: "Polyester" },
        ],
        selectValues: [],
    },
];
function Tulsi() {
    const [attribute, setAttribute] = useState([]);
    const [selectedOptionAtt, setSelectedOptionAtt] = useState(null);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [selectedOptionVari, setSelectedOptionVari] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState([]);
    //const [varinat, setVarinat] = useState([]);
    const handleChange = (selectedOptionAtt) => {

        setSelectedOptionAtt(selectedOptionAtt);
    };
    const isDisabled = (option) => {
        return selectedAttributes.includes(option.value);
    };
    const handleClick = (selectedOptionAtt) => {
        if (!selectedAttributes.includes(selectedOptionAtt.value)) {
            setAttribute([...attribute, selectedOptionAtt]);
            setSelectedAttributes([...selectedAttributes, selectedOptionAtt.value]);
        }
    };
    const handleRemove = (index) => {
        const newAttributes = [...attribute];
        const newSelectedAttributes = [...selectedAttributes];
        newAttributes.splice(index, 1);
        newSelectedAttributes.splice(index, 1);
        setAttribute(newAttributes);
        setSelectedAttributes(newSelectedAttributes);
    };
    const onChangeOptionVari = (selectedOptionVari, val) => {

        console.log("key", val);
        setSelectedOptionVari(selectedOptionVari);
        console.log("value-----", selectedOptionVari);
        const newAttributeList = [...attribute];
        const index = newAttributeList.findIndex((a) => a.key === val);
        console.log("index", index);
        newAttributeList[index].selectValues = selectedOptionVari;
        console.log("new attribute list", newAttributeList);
        setAttribute(newAttributeList);
        console.log(newAttributeList[index].selectValues)

    }
    const createvarinat = () => {
        const varinat = attribute.map((a) => a.selectValues);
        const result = cartesianProduct(...varinat);
        setSelectedVariant(result);
        console.log("result", result);



    };

    console.log("attributes", attribute);
    console.log("selectedOptionAtt", selectedOptionAtt);
    console.log("selecedAttributes", selectedAttributes);
    console.log("selecetdOptionvari", selectedOptionVari);
    console.log("selectedVarinat", selectedVariant);
    return (
        <div>
            <div>
                <label htmlFor="attri">Attributes</label>

                <Select
                    key={attributesList.keys}
                    options={attributesList}
                    onChange={handleChange}
                    value={selectedOptionAtt}
                    clearable={true}
                    isOptionDisabled={(option) => isDisabled(option)}
                />
            </div>
            <br />
            <div>
                <button onClick={() => handleClick(selectedOptionAtt)}>ADD</button>
            </div>
            <br />
            <div style={{ border: "solid" }}>
                {attribute.map((att, index) => (
                    <div key={index}>
                        <div>
                            <label>{att.label}</label>
                            <div>
                                <Select
                                    key={att.key}
                                    className={att.label}
                                    id={att.label}
                                    options={att.option}
                                    onChange={(selectedOptionVari) => onChangeOptionVari(selectedOptionVari, att.key)}
                                    isMulti={true}
                                />
                            </div>
                            <button onClick={() => handleRemove(index)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <div>
                <button onClick={createvarinat}>Create Varient
                </button>
                {

                    selectedVariant.map(
                        (element, index) => {
                            return <div key={index}>
                                <h6>{index + 1}</h6>
                                {element.map((ele, id) => {
                                    return <div key={id}>
                                        {ele.label}</div>
                                })}
                            </div>


                        }

                    )
                }
            </div>
        </div>
    );
}

export default Tulsi;