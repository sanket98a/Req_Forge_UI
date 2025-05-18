/**
 * Header component
 *
 * Displays the application header with the title.
 * In a real application, this would also include user information,
 * notifications, and other global UI elements.
 */
export default function Header() {
  return (
    <header className="border-b bg-white py-2">
      <h1 className="text-center text-lg font-medium text-gray-700">Requirement Forge</h1>
    </header>
  )
}
