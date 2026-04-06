import "../assets/css/toast.css";

const NotifToast = ({ config, setConfig }) => {
  const { show, message, type } = config;

  const variantClass =
    {
      success: "toast-success-subtle",
      warning: "toast-warning-subtle",
      danger: "toast-danger-subtle",
    }[type] || "bg-light";

  return (
    <div className="toast-container-custom">
      <div
        className={`toast toast-custom ${show ? "active" : ""} ${variantClass} shadow-sm`}
      >
        <div className="toast-body d-flex justify-content-between align-items-center">
          <span>{message}</span>
          <button
            type="button"
            className="btn-close"
            onClick={() => setConfig({ ...config, show: false })}
          ></button>
        </div>
        <div className="toast-progress"></div>
      </div>
    </div>
  );
};

export default NotifToast;
