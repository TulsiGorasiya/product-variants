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
function CartesianProductData() {
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
    console.log("vari=====", vari);
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
    console.log(newAttributeList[index].selectValues);
    let at = [];
    at = at.push(selectedOptionVari.value);
    console.log("at", at);
    setMatrix({
      ...matrix,
      [val]: [...vari],
    });
  };

  const createVariant = (matrix) => {
    let attrs = [];

    for (const [attr, values] of Object.entries(matrix))
      attrs.push(values.map((v) => ({ [attr]: v })));

    attrs = attrs.reduce((a, b) =>
      a.flatMap((d) => b.map((e) => ({ ...d, ...e })))
    );

    console.log("CartesianProductData", attrs);
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
      <div className="font-bold flex justify-center mt-6 text-2xl">
        PRODUCT VARIANTS
      </div>
      <div className="flex gap-5 my-5 justify-center items-center">
        <label htmlFor="attri" className="font-bold">
          {" "}
          Select Attributes
        </label>

        <Select
          key={attributesList.keys}
          options={attributesList}
          onChange={handleChange}
          value={selectedOptionAtt}
          clearable={true}
          isOptionDisabled={(option) => isDisabled(option)}
        />
        <div className="border border-solid rounded-lg bg-gray-200">
          <button
            className="p-2"
            onClick={() => handleClick(selectedOptionAtt)}
          >
            ADD
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="border border-solid border-black p-5 w-auto">
          {attribute.map((att, index) => (
            <div key={index} className="">
              <div>
                <label className="font-bold">{att.label}</label>
                <div className="flex justify-between mt-2 items-center">
                  <div className="w-9/12 mr-2">
                    <Select
                      key={att.key}
                      className={att.label}
                      id={att.label}
                      options={att.option}
                      onChange={(selectedOptionVari) =>
                        onChangeOptionVari(selectedOptionVari, att.key)
                      }
                      isMulti={true}
                    />
                  </div>
                  <div className="border border-solid border-gray bg-gray-200 rounded-lg ">
                    <button className="p-2" onClick={() => handleRemove(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="">
            <button
              className="p-2 border border-solid bg-gray-200 rounded-lg mt-10"
              onClick={() => createVariant(matrix)}
            >
              Create Varient
            </button>
          </div>
        </div>
        <div className="border border-solid border-black p-5 w-auto mx-10">
          {varinat.map((element, index) => {
            return (
              <div key={index} className="flex">
                <div className="mr-10">⚫{index}</div>
                <div className="flex">
                  {Object.values(element).map((ele, id) => {
                    return (
                      <div key={id} className="mr-10">
                        {ele}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <br />
    </div>
  );
}

export default CartesianProductData;
