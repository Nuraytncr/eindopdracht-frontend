import  styles from './Input.module.css';

function Input({ type, name, label, id, validationRules, register, errors, labelStyle }) {
    return (
      <>
      <div className={styles.group}>
        <label className={styles[labelStyle]} htmlFor={id}>
          {label}
        </label>
          <input
            placeholder={label}
            type={type}
            id={id}
            {...register(name, validationRules)}
          />
        {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
        </div>
      </>
    );
  }
  
  export default Input;