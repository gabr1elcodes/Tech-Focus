export default function EmptyState() {
  return (
    <div className="p-6 text-center">
      <p className="text-gray-600">Você ainda não criou nenhuma nota.</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Criar primeira nota
      </button>
    </div>
  );
}
