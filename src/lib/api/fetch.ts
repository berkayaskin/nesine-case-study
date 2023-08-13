export async function fetchData<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  try {
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('An error occurred while fetching the data:', error)
    throw error
  }
}
