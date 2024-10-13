import { useFormContext } from "react-hook-form";
import { ITextField } from "../../../src/utils/interfaces/ITextField";
import { ChangeEvent, useEffect, useState } from "react";
import FormatValue from "../../../src/utils/functions/FormatValue";
import { get } from 'lodash';

export default function TextField({
  label,
  name,
  placeholder,
  icon,
  iconSize,
  typeField,
  maskType,
  max
}: ITextField) {
  const {
    register,
    formState: { errors },
    watch,
    setValue: setValueForm,
  } = useFormContext();
  const fieldValue = watch(name);
  const [value, setValue] = useState(fieldValue || '');


  useEffect(() => {
    setValue(fieldValue || '');
  }, [ fieldValue ])
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    if(maskType) {
      inputValue = FormatValue(inputValue, maskType);
    }

    setValue(inputValue);
    setValueForm(name, inputValue);
  }

  const error = get(errors, name);

  return  (
    <div className="w-full">
      <label
        htmlFor={ name }
        className="flex flex-col w-full px-5 py-2  rounded-xl border border-neutral-700/15 hover:ring hover:ring-slate-700/15 cursor-pointer duration-200"
      >
        <div className="flex flex-row space-x-1.5">
          { icon && (
            <img
              src={ icon }
              alt="SVG Icon"
              width={ iconSize ?? 18 }
            />
          )}
          <span className="font-bold text-base text-neutral-700/50">
            { label }
          </span>
        </div>
      
        <input 
          type={ typeField }
          id={ name }
          placeholder={ placeholder ?? "" }
          aria-invalid={ !!error?.message }
          { ...register(name) }
          value={ value }
          maxLength={ max ? max : 500 }
          onChange={ handleChange }
          className="outline-none text-base placeholder-neutral-700/70 w-full font-semibold"
        />
      </label>
      { 
        error?.message && 
        <span 
          className="font-semibold text-red-500/60 text-xs flex justify-end"
        >
          { error?.message?.toString() }
        </span>
      }
    </div>
  );
}