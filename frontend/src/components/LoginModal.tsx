import { useRef } from "react";
import LoginForm from "./LoginForm";

export default function LoginModal() {
  const loginModal = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => loginModal.current?.showModal()}
      >
        Login
      </div>
      <dialog id="loginModal" className="modal" ref={loginModal}>
        <div className="modal-box">
          <LoginForm></LoginForm>

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
