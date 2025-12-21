export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 min-h-[60vh]">
      <p className="text-sm sm:text-base text-gray-600 max-w-sm">Você ainda não criou nenhuma nota.</p>
      <button className="mt-6 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Criar primeira nota
      </button>
    </div>
  );
}
