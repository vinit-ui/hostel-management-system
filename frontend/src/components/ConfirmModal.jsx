import Button from './Button'

function ConfirmModal({ title, message, confirmText, cancelText, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 modal-backdrop p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 modal-content border border-slate-100">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-2">{message}</p>
        </div>
        <div className="flex justify-end gap-3">
          <Button label={cancelText || "Cancel"} variant="secondary" onClick={onCancel} />
          <Button label={confirmText || "Confirm"} variant="danger" onClick={onConfirm} />
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
