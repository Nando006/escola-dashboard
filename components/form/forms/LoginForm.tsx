import TextField from "../fields/TextField";

export default function LoginForm() {
  return (
    <div>
      <TextField 
        label="E-mail"
        name="email"
        typeField="text"
        placeholder="Digite seu e-mail"
        icon="/svg/email.svg"
      />
    </div>
  );
}