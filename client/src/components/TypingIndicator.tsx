const TypingIndicator = ({ visible }: { visible: boolean }) => {
  return (
    <div
      className={`flex items-center gap-1 max-w-fit bg-gray-200 text-gray-600 px-3 py-2 rounded-2xl transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

export default TypingIndicator;
