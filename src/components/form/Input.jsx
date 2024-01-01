import  styles from './Input.module.css';

function Input({ type, name, label, id, validationRules, register, errors, labelStyle, onChangeCallBack }) {
  const inputRegistration = register ? register(name, validationRules) : {};

  return (
    <>
      <div className={styles.group}>
        <label className={styles[labelStyle]} htmlFor={id}>
          {label}
        </label>
        <input
          onChange={event => onChangeCallBack(event.target.value)}
          placeholder={label}
          type={type}
          id={id}
          {...(register ? inputRegistration : {})}
        />
        {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
      </div>
    </>
  );
  
  }
  
  export default Input;