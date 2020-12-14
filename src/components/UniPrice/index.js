import React, { useMemo } from 'react'
import styled from 'styled-components'
import Panel from '../Panel'
import { AutoColumn } from '../Column'
import { RowFixed } from '../Row'
import { TYPE } from '../../Theme'
import { usePairData } from '../../contexts/PairData'
import { formattedNum } from '../../utils'

const PriceCard = styled(Panel)`
  position: absolute;
  right: -220px;
  width: 220px;
  top: -20px;
  z-index: 9999;
  height: fit-content;
  background-color: ${({ theme }) => theme.bg1};
`

function formatPercent(rawPercent) {
  if (rawPercent < 0.01) {
    return '<1%'
  } else return parseFloat(rawPercent * 100).toFixed(0) + '%'
}

export default function UniPrice() {
  const daiPair = usePairData('0x18e249b6ff08a5abde41de4615d18178c0e53746')
  const usdcPair = usePairData('0x6122fc570f429e7cfb901fd3a6b8d197f5f4cff6')
  const usdtPair = usePairData('0xd9538b22cd06f5a303898c8f5df6b4191f08497c')

  const totalLiquidity = useMemo(() => {
    return daiPair && usdcPair && usdtPair
      ? daiPair.trackedReserveUSD + usdcPair.trackedReserveUSD + usdtPair.trackedReserveUSD
      : 0
  }, [daiPair, usdcPair, usdtPair])

  const daiPerEth = daiPair ? parseFloat(daiPair.token0Price).toFixed(2) : '-'
  const usdcPerEth = usdcPair ? parseFloat(usdcPair.token0Price).toFixed(2) : '-'
  const usdtPerEth = usdtPair ? parseFloat(usdtPair.token1Price).toFixed(2) : '-'

  return (
    <PriceCard>
      <AutoColumn gap="10px">
        <RowFixed>
          <TYPE.main>DAI/ETH: {formattedNum(daiPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {daiPair && totalLiquidity ? formatPercent(daiPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
        <RowFixed>
          <TYPE.main>USDC/ETH: {formattedNum(usdcPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {usdcPair && totalLiquidity ? formatPercent(usdcPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
        <RowFixed>
          <TYPE.main>USDT/ETH: {formattedNum(usdtPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {usdtPair && totalLiquidity ? formatPercent(usdtPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
      </AutoColumn>
    </PriceCard>
  )
}
