export const EVM_NETWORKS: any = {
  ethereum: {
    name: "Ethereum Mainnet",
    rpc: "https://eth.llamarpc.com",
    chainId: 1,
    nativeCurrency: "ETH",
    explorer: "https://etherscan.io",
    coingeckoId: "ethereum",
  },
  binance: {
    name: "BNB Smart Chain",
    rpc: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    nativeCurrency: "BNB",
    explorer: "https://bscscan.com",
    coingeckoId: "binancecoin",
  },
  polygon: {
    name: "Polygon",
    rpc: "https://polygon-rpc.com/",
    chainId: 137,
    nativeCurrency: "MATIC",
    explorer: "https://polygonscan.com",
    coingeckoId: "polygon-ecosystem-token",
  },
  avalanche: {
    name: "Avalanche C-Chain",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    chainId: 43114,
    nativeCurrency: "AVAX",
    explorer: "https://snowtrace.io",
    coingeckoId: "avalanche-2",
  },
  arbitrum: {
    name: "Arbitrum One",
    rpc: "https://arb1.arbitrum.io/rpc",
    chainId: 42161,
    nativeCurrency: "ETH",
    explorer: "https://arbiscan.io",
    coingeckoId: "arbitrum",
  },
  optimism: {
    name: "Optimism",
    rpc: "https://mainnet.optimism.io",
    chainId: 10,
    nativeCurrency: "ETH",
    explorer: "https://optimistic.etherscan.io",
    coingeckoId: "optimism",
  },
  base: {
    name: "Base",
    rpc: "https://mainnet.base.org",
    chainId: 8453,
    nativeCurrency: "ETH",
    explorer: "https://basescan.org",
    coingeckoId: "base",
  },
  cronos: {
    name: "Cronos Mainnet",
    rpc: "https://evm.cronos.org",
    chainId: 25,
    nativeCurrency: "CRO",
    explorer: "https://cronoscan.com",
    coingeckoId: "cronos",
  },
  aurora: {
    name: "Aurora Mainnet",
    rpc: "https://mainnet.aurora.dev",
    chainId: 1313161554,
    nativeCurrency: "ETH",
    explorer: "https://aurorascan.dev",
    coingeckoId: "aurora",
  },
  gnosis: {
    name: "Gnosis Chain",
    rpc: "https://rpc.gnosischain.com",
    chainId: 100,
    nativeCurrency: "xDAI",
    explorer: "https://gnosisscan.io",
    coingeckoId: "xdai",
  },
};

[
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
  },
  {
    id: "tether",
    symbol: "usdt",
    name: "Tether",
    image:
      "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
  },
  {
    id: "usd-coin",
    symbol: "usdc",
    name: "USDC",
    image:
      "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
  },
  {
    id: "tron",
    symbol: "trx",
    name: "TRON",
    image:
      "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193",
  },
  {
    id: "staked-ether",
    symbol: "steth",
    name: "Lido Staked Ether",
    image:
      "https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
  },
  {
    id: "wrapped-bitcoin",
    symbol: "wbtc",
    name: "Wrapped Bitcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857",
  },
  {
    id: "sui",
    symbol: "sui",
    name: "Sui",
    image:
      "https://coin-images.coingecko.com/coins/images/26375/large/sui-ocean-square.png?1727791290",
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image:
      "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
  },
  {
    id: "wrapped-steth",
    symbol: "wsteth",
    name: "Wrapped stETH",
    image:
      "https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295",
  },
  {
    id: "avalanche-2",
    symbol: "avax",
    name: "Avalanche",
    image:
      "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369",
  },
  {
    id: "stellar",
    symbol: "xlm",
    name: "Stellar",
    image:
      "https://coin-images.coingecko.com/coins/images/100/large/fmpFRHHQ_400x400.jpg?1735231350",
  },
  {
    id: "shiba-inu",
    symbol: "shib",
    name: "Shiba Inu",
    image:
      "https://coin-images.coingecko.com/coins/images/11939/large/shiba.png?1696511800",
  },
  {
    id: "leo-token",
    symbol: "leo",
    name: "LEO Token",
    image:
      "https://coin-images.coingecko.com/coins/images/8418/large/leo-token.png?1696508607",
  },
  {
    id: "hyperliquid",
    symbol: "hype",
    name: "Hyperliquid",
    image:
      "https://coin-images.coingecko.com/coins/images/50882/large/hyperliquid.jpg?1729431300",
  },
  {
    id: "hedera-hashgraph",
    symbol: "hbar",
    name: "Hedera",
    image:
      "https://coin-images.coingecko.com/coins/images/3688/large/hbar.png?1696504364",
  },
  {
    id: "bitcoin-cash",
    symbol: "bch",
    name: "Bitcoin Cash",
    image:
      "https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1696501932",
  },
  {
    id: "the-open-network",
    symbol: "ton",
    name: "Toncoin",
    image:
      "https://coin-images.coingecko.com/coins/images/17980/large/photo_2024-09-10_17.09.00.jpeg?1725963446",
  },
  {
    id: "litecoin",
    symbol: "ltc",
    name: "Litecoin",
    image:
      "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png?1696501400",
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image:
      "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008",
  },
  {
    id: "usds",
    symbol: "usds",
    name: "USDS",
    image:
      "https://coin-images.coingecko.com/coins/images/39926/large/usds.webp?1726666683",
  },
  {
    id: "weth",
    symbol: "weth",
    name: "WETH",
    image:
      "https://coin-images.coingecko.com/coins/images/2518/large/weth.png?1696503332",
  },
  {
    id: "pi-network",
    symbol: "pi",
    name: "Pi Network",
    image:
      "https://coin-images.coingecko.com/coins/images/54342/large/pi_network.jpg?1739347576",
  },
  {
    id: "monero",
    symbol: "xmr",
    name: "Monero",
    image:
      "https://coin-images.coingecko.com/coins/images/69/large/monero_logo.png?1696501460",
  },
  {
    id: "wrapped-eeth",
    symbol: "weeth",
    name: "Wrapped eETH",
    image:
      "https://coin-images.coingecko.com/coins/images/33033/large/weETH.png?1701438396",
  },
  {
    id: "bitget-token",
    symbol: "bgb",
    name: "Bitget Token",
    image:
      "https://coin-images.coingecko.com/coins/images/11610/large/Bitget_logo.png?1736925727",
  },
  {
    id: "pepe",
    symbol: "pepe",
    name: "Pepe",
    image:
      "https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
  },
  {
    id: "binance-bridged-usdt-bnb-smart-chain",
    symbol: "bsc-usd",
    name: "Binance Bridged USDT (BNB Smart Chain)",
    image:
      "https://coin-images.coingecko.com/coins/images/35021/large/USDT.png?1707233575",
  },
  {
    id: "ethena-usde",
    symbol: "usde",
    name: "Ethena USDe",
    image:
      "https://coin-images.coingecko.com/coins/images/33613/large/usde.png?1733810059",
  },
  {
    id: "coinbase-wrapped-btc",
    symbol: "cbbtc",
    name: "Coinbase Wrapped BTC",
    image:
      "https://coin-images.coingecko.com/coins/images/40143/large/cbbtc.webp?1726136727",
  },
  {
    id: "whitebit",
    symbol: "wbt",
    name: "WhiteBIT Coin",
    image:
      "https://coin-images.coingecko.com/coins/images/27045/large/wbt_token.png?1696526096",
  },
  {
    id: "bittensor",
    symbol: "tao",
    name: "Bittensor",
    image:
      "https://coin-images.coingecko.com/coins/images/28452/large/ARUsPeNQ_400x400.jpeg?1696527447",
  },
  {
    id: "uniswap",
    symbol: "uni",
    name: "Uniswap",
    image:
      "https://coin-images.coingecko.com/coins/images/12504/large/uniswap-logo.png?1720676669",
  },
  {
    id: "dai",
    symbol: "dai",
    name: "Dai",
    image:
      "https://coin-images.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696509996",
  },
  {
    id: "near",
    symbol: "near",
    name: "NEAR Protocol",
    image:
      "https://coin-images.coingecko.com/coins/images/10365/large/near.jpg?1696510367",
  },
  {
    id: "aptos",
    symbol: "apt",
    name: "Aptos",
    image:
      "https://coin-images.coingecko.com/coins/images/26455/large/aptos_round.png?1696525528",
  },
  {
    id: "aave",
    symbol: "aave",
    name: "Aave",
    image:
      "https://coin-images.coingecko.com/coins/images/12645/large/aave-token-round.png?1720472354",
  },
  {
    id: "okb",
    symbol: "okb",
    name: "OKB",
    image:
      "https://coin-images.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png?1696505053",
  },
  {
    id: "ondo-finance",
    symbol: "ondo",
    name: "Ondo",
    image:
      "https://coin-images.coingecko.com/coins/images/26580/large/ONDO.png?1696525656",
  },
  {
    id: "kaspa",
    symbol: "kas",
    name: "Kaspa",
    image:
      "https://coin-images.coingecko.com/coins/images/25751/large/kaspa-icon-exchanges.png?1696524837",
  },
  {
    id: "jito-staked-sol",
    symbol: "jitosol",
    name: "Jito Staked SOL",
    image:
      "https://coin-images.coingecko.com/coins/images/28046/large/JitoSOL-200.png?1696527060",
  },
  {
    id: "crypto-com-chain",
    symbol: "cro",
    name: "Cronos",
    image:
      "https://coin-images.coingecko.com/coins/images/7310/large/cro_token_logo.png?1696507599",
  },
  {
    id: "blackrock-usd-institutional-digital-liquidity-fund",
    symbol: "buidl",
    name: "BlackRock USD Institutional Digital Liquidity Fund",
    image:
      "https://coin-images.coingecko.com/coins/images/36291/large/blackrock.png?1711013223",
  },
  {
    id: "internet-computer",
    symbol: "icp",
    name: "Internet Computer",
    image:
      "https://coin-images.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png?1696514180",
  },
  {
    id: "ethereum-classic",
    symbol: "etc",
    name: "Ethereum Classic",
    image:
      "https://coin-images.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1696501717",
  },
  {
    id: "tokenize-xchange",
    symbol: "tkx",
    name: "Tokenize Xchange",
    image:
      "https://coin-images.coingecko.com/coins/images/4984/large/TKX_-_Logo_-_RGB-15.png?1696505519",
  },
  {
    id: "gatechain-token",
    symbol: "gt",
    name: "Gate",
    image:
      "https://coin-images.coingecko.com/coins/images/8183/large/200X200.png?1735246724",
  },
  {
    id: "mantle",
    symbol: "mnt",
    name: "Mantle",
    image:
      "https://coin-images.coingecko.com/coins/images/30980/large/Mantle-Logo-mark.png?1739213200",
  },
  {
    id: "official-trump",
    symbol: "trump",
    name: "Official Trump",
    image:
      "https://coin-images.coingecko.com/coins/images/53746/large/trump.png?1737171561",
  },
  {
    id: "render-token",
    symbol: "render",
    name: "Render",
    image:
      "https://coin-images.coingecko.com/coins/images/11636/large/rndr.png?1696511529",
  },
  {
    id: "vechain",
    symbol: "vet",
    name: "VeChain",
    image:
      "https://coin-images.coingecko.com/coins/images/1167/large/VET.png?1742383283",
  },
  {
    id: "susds",
    symbol: "susds",
    name: "sUSDS",
    image:
      "https://coin-images.coingecko.com/coins/images/52721/large/sUSDS_Coin.png?1734086971",
  },
  {
    id: "cosmos",
    symbol: "atom",
    name: "Cosmos Hub",
    image:
      "https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696502525",
  },
  {
    id: "ethena",
    symbol: "ena",
    name: "Ethena",
    image:
      "https://coin-images.coingecko.com/coins/images/36530/large/ethena.png?1711701436",
  },
  {
    id: "ethena-staked-usde",
    symbol: "susde",
    name: "Ethena Staked USDe",
    image:
      "https://coin-images.coingecko.com/coins/images/33669/large/sUSDe-Symbol-Color.png?1716307680",
  },
  {
    id: "usd1-wlfi",
    symbol: "usd1",
    name: "USD1",
    image:
      "https://coin-images.coingecko.com/coins/images/54977/large/30Q2SFVH_400x400.jpg?1742998328",
  },
  {
    id: "polygon-ecosystem-token",
    symbol: "pol",
    name: "POL (ex-MATIC)",
    image:
      "https://coin-images.coingecko.com/coins/images/32440/large/polygon.png?1698233684",
  },
  {
    id: "lombard-staked-btc",
    symbol: "lbtc",
    name: "Lombard Staked BTC",
    image:
      "https://coin-images.coingecko.com/coins/images/39969/large/LBTC_Logo.png?1724959872",
  },
  {
    id: "fetch-ai",
    symbol: "fet",
    name: "Artificial Superintelligence Alliance",
    image:
      "https://coin-images.coingecko.com/coins/images/5681/large/ASI.png?1719827289",
  },
  {
    id: "filecoin",
    symbol: "fil",
    name: "Filecoin",
    image:
      "https://coin-images.coingecko.com/coins/images/12817/large/filecoin.png?1696512609",
  },
  {
    id: "algorand",
    symbol: "algo",
    name: "Algorand",
    image:
      "https://coin-images.coingecko.com/coins/images/4380/large/download.png?1696504978",
  },
  {
    id: "arbitrum",
    symbol: "arb",
    name: "Arbitrum",
    image:
      "https://coin-images.coingecko.com/coins/images/16547/large/arb.jpg?1721358242",
  },
  {
    id: "fasttoken",
    symbol: "ftn",
    name: "Fasttoken",
    image:
      "https://coin-images.coingecko.com/coins/images/28478/large/lightenicon_200x200.png?1696527472",
  },
  {
    id: "celestia",
    symbol: "tia",
    name: "Celestia",
    image:
      "https://coin-images.coingecko.com/coins/images/31967/large/tia.jpg?1696530772",
  },
  {
    id: "worldcoin-wld",
    symbol: "wld",
    name: "Worldcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/31069/large/worldcoin.jpeg?1696529903",
  },
  {
    id: "sonic-3",
    symbol: "s",
    name: "Sonic (prev. FTM)",
    image:
      "https://coin-images.coingecko.com/coins/images/38108/large/200x200_Sonic_Logo.png?1734679256",
  },
  {
    id: "bonk",
    symbol: "bonk",
    name: "Bonk",
    image:
      "https://coin-images.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587",
  },
  {
    id: "jupiter-perpetuals-liquidity-provider-token",
    symbol: "jlp",
    name: "Jupiter Perpetuals Liquidity Provider Token",
    image:
      "https://coin-images.coingecko.com/coins/images/33094/large/jlp.png?1700631386",
  },
  {
    id: "binance-peg-weth",
    symbol: "weth",
    name: "Binance-Peg WETH",
    image:
      "https://coin-images.coingecko.com/coins/images/39580/large/weth.png?1723006716",
  },
  {
    id: "first-digital-usd",
    symbol: "fdusd",
    name: "First Digital USD",
    image:
      "https://coin-images.coingecko.com/coins/images/31079/large/FDUSD_icon_black.png?1731097953",
  },
  {
    id: "kucoin-shares",
    symbol: "kcs",
    name: "KuCoin",
    image:
      "https://coin-images.coingecko.com/coins/images/1047/large/sa9z79.png?1696502152",
  },
  {
    id: "maker",
    symbol: "mkr",
    name: "Maker",
    image:
      "https://coin-images.coingecko.com/coins/images/1364/large/Mark_Maker.png?1696502423",
  },
  {
    id: "jupiter-exchange-solana",
    symbol: "jup",
    name: "Jupiter",
    image:
      "https://coin-images.coingecko.com/coins/images/34188/large/jup.png?1704266489",
  },
  {
    id: "binance-staked-sol",
    symbol: "bnsol",
    name: "Binance Staked SOL",
    image:
      "https://coin-images.coingecko.com/coins/images/40132/large/bnsol.png?1725968367",
  },
  {
    id: "quant-network",
    symbol: "qnt",
    name: "Quant",
    image:
      "https://coin-images.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg?1696504070",
  },
  {
    id: "kelp-dao-restaked-eth",
    symbol: "rseth",
    name: "Kelp DAO Restaked ETH",
    image:
      "https://coin-images.coingecko.com/coins/images/33800/large/Icon___Dark.png?1702991855",
  },
  {
    id: "blockstack",
    symbol: "stx",
    name: "Stacks",
    image:
      "https://coin-images.coingecko.com/coins/images/2069/large/Stacks_Logo_png.png?1709979332",
  },
  {
    id: "story-2",
    symbol: "ip",
    name: "Story",
    image:
      "https://coin-images.coingecko.com/coins/images/54035/large/Transparent_bg.png?1738075331",
  },
  {
    id: "optimism",
    symbol: "op",
    name: "Optimism",
    image:
      "https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png?1696524385",
  },
  {
    id: "flare-networks",
    symbol: "flr",
    name: "Flare",
    image:
      "https://coin-images.coingecko.com/coins/images/28624/large/FLR-icon200x200.png?1696527609",
  },
  {
    id: "nexo",
    symbol: "nexo",
    name: "NEXO",
    image:
      "https://coin-images.coingecko.com/coins/images/3695/large/CG-nexo-token-200x200_2x.png?1730414360",
  },
  {
    id: "fartcoin",
    symbol: "fartcoin",
    name: "Fartcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/50891/large/fart.jpg?1729503972",
  },
  {
    id: "sei-network",
    symbol: "sei",
    name: "Sei",
    image:
      "https://coin-images.coingecko.com/coins/images/28205/large/Sei_Logo_-_Transparent.png?1696527207",
  },
  {
    id: "immutable-x",
    symbol: "imx",
    name: "Immutable",
    image:
      "https://coin-images.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png?1696516787",
  },
  {
    id: "injective-protocol",
    symbol: "inj",
    name: "Injective",
    image:
      "https://coin-images.coingecko.com/coins/images/12882/large/Other_200x200.png?1738782212",
  },
  {
    id: "virtual-protocol",
    symbol: "virtual",
    name: "Virtuals Protocol",
    image:
      "https://coin-images.coingecko.com/coins/images/34057/large/LOGOMARK.png?1708356054",
  },
  {
    id: "eos",
    symbol: "eos",
    name: "EOS",
    image:
      "https://coin-images.coingecko.com/coins/images/738/large/CG_EOS_Icon.png?1731705232",
  },
  {
    id: "rocket-pool-eth",
    symbol: "reth",
    name: "Rocket Pool ETH",
    image:
      "https://coin-images.coingecko.com/coins/images/20764/large/reth.png?1696520159",
  },
  {
    id: "xdce-crowd-sale",
    symbol: "xdc",
    name: "XDC Network",
    image:
      "https://coin-images.coingecko.com/coins/images/2912/large/xdc-icon.png?1696503661",
  },
  {
    id: "the-graph",
    symbol: "grt",
    name: "The Graph",
    image:
      "https://coin-images.coingecko.com/coins/images/13397/large/Graph_Token.png?1696513159",
  },
  {
    id: "usdt0",
    symbol: "usdt0",
    name: "USDT0",
    image:
      "https://coin-images.coingecko.com/coins/images/53705/large/usdt0.jpg?1737086183",
  },
  {
    id: "solv-btc",
    symbol: "solvbtc",
    name: "Solv Protocol BTC",
    image:
      "https://coin-images.coingecko.com/coins/images/36800/large/solvBTC.png?1719810684",
  },
  {
    id: "dogwifcoin",
    symbol: "wif",
    name: "dogwifhat",
    image:
      "https://coin-images.coingecko.com/coins/images/33566/large/dogwifhat.jpg?1702499428",
  },
  {
    id: "floki",
    symbol: "floki",
    name: "FLOKI",
    image:
      "https://coin-images.coingecko.com/coins/images/16746/large/PNG_image.png?1696516318",
  },
  {
    id: "raydium",
    symbol: "ray",
    name: "Raydium",
    image:
      "https://coin-images.coingecko.com/coins/images/13928/large/PSigc4ie_400x400.jpg?1696513668",
  },
];
