import React, { useState } from "react";
import Select from "react-select";

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
    const [matrix, setMatrix] = useState({});
    const [varinat, setVarinat] = useState([]);
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
        let vari = selectedOptionVari.map((a) => a.value);
        console.log("vari=====", vari)
        //console.log("selectedOption------",selectedOptionVari.map((a)=>a.se))
        console.log("val", val);
        setSelectedOptionVari(selectedOptionVari);
        console.log("value-----", selectedOptionVari);
        const newAttributeList = [...attribute];
        const index = newAttributeList.findIndex((a) => a.key === val);
        console.log("index", index);
        newAttributeList[index].selectValues = selectedOptionVari;
        console.log("new attribute list", newAttributeList);
        setAttribute(newAttributeList);
        console.log(newAttributeList[index].selectValues)
        let at = [];
        at = at.push(selectedOptionVari.value);
        console.log("at", at)
        setMatrix({
            ...matrix,
            [val]: [...vari]
        })

    }


    const createVariant = (matrix) => {
        let attrs = [];

        for (const [attr, values] of Object.entries(matrix))
            attrs.push(values.map(v => ({ [attr]: v })));

        attrs = attrs.reduce((a, b) => a.flatMap(d => b.map(e => ({ ...d, ...e }))));

        console.log("tulsi", attrs);
        const entries = Object.values(attrs);
        console.log("ent", entries);
        setVarinat(entries);


    };

    console.log("attributes", attribute);
    console.log("selectedOptionAtt", selectedOptionAtt);
    console.log("selecedAttributes", selectedAttributes);
    console.log("selecetdOptionvari", selectedOptionVari);
    console.log("selectedVarinat", selectedVariant);
    console.log("matrix=====", matrix);
    console.log("varinat====", varinat);
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
                            {/* {console.log(att.selectedOptionVari)}
                                {console.log(selectedOptionVari)
                                } */}
                            <button onClick={() => handleRemove(index)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <div>
                <button onClick={() => createVariant(matrix)}>Create Varient
                </button>
                {
                    varinat.map((element, index) => {
                        return (
                            <div key={index}>
                                #{index}
                                {console.log("e", Object.values(element))}
                                {console.log("i", index)}
                                {/* {index}
                            <div> {element}</div> */}
                                {
                                    Object.values(element).map((ele, id) => {
                                        return (
                                            <div key={id}>{ele}</div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Tulsi;