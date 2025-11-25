export default function AboutPage() {
  return (
    <>
      <main className="p-4">
        <h1 className="mb-2">Ich bin die ABOUT PAGE</h1>
        <div className="p-5">
          <p className="text-xl">
            1. Auf dieser Base React Site wurde folgendes verwendet:
          </p>
          <ul className="p-5 text-xl">
            <li>Vite</li>
            <li>Typescript</li>
            <li>React</li>
            <li>TailwindCss</li>
            <li>React-Router</li>
            <li>Prodected-Layout (React-Router)</li>
            <li>createContext() - React Context API</li>
            <li>useFormAction() - Form Validierung</li>
            <li>useRef() - Für Open-Login-Modal</li>
          </ul>
          <p className="text-xl p-10">Viel Spaß damit..</p>
        </div>
      </main>
    </>
  );
}
