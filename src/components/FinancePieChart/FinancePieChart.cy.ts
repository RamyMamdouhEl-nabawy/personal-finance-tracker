import type IPlByMonth from '@/interfaces/PlByMonth'
import FinancePieChart from './FinancePieChart.vue'
import { useStore } from 'vuex'

const store = useStore()

const plByMonth: IPlByMonth[] = [
  {
    id: 1,
    type: 'expense',
    category: 'Bills',
    currency: 'EGP',
    amount: 500,
    date: "2024-12-02",
  },
  {
    id: 2,
    type: 'expense',
    category: 'Transportation',
    currency: 'EGP',
    amount: 1800,
    date: "2024-12-02",
  }
]

describe('<FinancePieChart />', () => {
  beforeEach(() => {
    cy.mount(FinancePieChart)
  })

  it('renders', () => {})

  it('renders without data', () => { })

  it('renders with data, check if svg exists', () => {
    cy.mount(FinancePieChart, {
      global: {
        plugins: [store],
      },
      props: {
        plByMonth,
      },
    })
    cy.get('svg').should('exist')
  })

})
