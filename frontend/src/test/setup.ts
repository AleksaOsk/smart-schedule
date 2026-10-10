import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
  writable: true,
  value: vi.fn(),
})
Object.defineProperty(HTMLDialogElement.prototype, 'close', {
  writable: true,
  value: vi.fn(),
})

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))