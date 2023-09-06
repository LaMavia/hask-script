export type HState = {
  builtInMappings: Record<string, string>
  globalSymbol: string
}

export const newHState = (): HState => ({
  builtInMappings: {},
  globalSymbol: '$$Hask',
})
