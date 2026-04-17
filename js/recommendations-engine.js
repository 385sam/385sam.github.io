(function (global) {
  'use strict';

  const REAL_INSTRUMENTS = [
    {
      ticker: 'VYM',
      name: 'Vanguard High Dividend Yield ETF',
      type: 'etf',
      region: 'USA',
      typicalYield: 3.0,
      typicalGrowth: 4.0,
      ter: 0.06,
      risk: 'medium',
      styles: ['balanced', 'income'],
      fitNote: 'Balanced profile with stable yield and moderate dividend growth.'
    },
    {
      ticker: 'AVGO',
      name: 'Broadcom',
      type: 'stock',
      region: 'USA',
      typicalYield: 2.1,
      typicalGrowth: 15.2,
      ter: 0.0,
      risk: 'medium',
      styles: ['growth', 'balanced'],
      fitNote: 'Semiconduttori con crescita elevata e dividendo in costante aumento.'
    },
    {
      ticker: 'TXN',
      name: 'Texas Instruments',
      type: 'stock',
      region: 'USA',
      typicalYield: 3.0,
      typicalGrowth: 7.0,
      ter: 0.0,
      risk: 'low',
      styles: ['income', 'balanced'],
      fitNote: 'Dividend payer affidabile con crescita moderata e forte free cash flow.'
    },
    {
      ticker: 'ABBV',
      name: 'AbbVie',
      type: 'stock',
      region: 'USA',
      typicalYield: 3.9,
      typicalGrowth: 6.5,
      ter: 0.0,
      risk: 'medium',
      styles: ['income', 'balanced'],
      fitNote: 'Farmaceutica con yield sostenuto e pipeline in espansione.'
    },
    {
      ticker: 'LOW',
      name: 'Lowe’s Companies',
      type: 'stock',
      region: 'USA',
      typicalYield: 2.0,
      typicalGrowth: 8.0,
      ter: 0.0,
      risk: 'medium',
      styles: ['balanced'],
      fitNote: 'Retail ciclico con dividendo crescente e solida redditivita.'
    },
    {
      ticker: 'LMT',
      name: 'Lockheed Martin',
      type: 'stock',
      region: 'USA',
      typicalYield: 2.7,
      typicalGrowth: 6.0,
      ter: 0.0,
      risk: 'low',
      styles: ['income', 'balanced'],
      fitNote: 'Difesa con flussi stabili e buona visibilita sui ricavi.'
    },
    {
      ticker: 'EWU',
      name: 'iShares MSCI United Kingdom ETF',
      type: 'etf',
      region: 'Europa',
      typicalYield: 4.0,
      typicalGrowth: 3.5,
      ter: 0.49,
      risk: 'medium',
      styles: ['income', 'balanced'],
      fitNote: 'Esposizione al mercato UK con dividendi storicamente elevati.'
    },
    {
      ticker: 'DGRO',
      name: 'iShares Core Dividend Growth ETF',
      type: 'etf',
      region: 'USA',
      typicalYield: 2.3,
      typicalGrowth: 6.8,
      ter: 0.08,
      risk: 'medium',
      styles: ['balanced', 'growth'],
      fitNote: 'ETF focalizzato su crescita sostenibile dei dividendi.'
    },
    {
      ticker: 'STAG',
      name: 'STAG Industrial',
      type: 'reit',
      region: 'USA',
      typicalYield: 4.3,
      typicalGrowth: 4.0,
      ter: 0.0,
      risk: 'medium',
      styles: ['income', 'balanced'],
      fitNote: 'REIT industriale con reddito stabile e crescita moderata.'
    },
    {
      ticker: 'E',
      name: 'Eni',
      type: 'stock',
      region: 'Europa',
      typicalYield: 6.2,
      typicalGrowth: 3.0,
      ter: 0.0,
      risk: 'medium',
      styles: ['income'],
      fitNote: 'Energy europea con yield elevato e focus su transizione energetica.'
    },
    {
      ticker: 'ADBE',
      name: 'Adobe',
      type: 'stock',
      region: 'USA',
      typicalYield: 0.0,
      typicalGrowth: 15.5,
      ter: 0.0,
      risk: 'medium',
      styles: ['growth'],
      fitNote: 'Software leader con crescita strutturale e forte marginalita.'
    },
    {
      ticker: 'SCHD',
      name: 'Schwab U.S. Dividend Equity ETF',
      type: 'etf',
      region: 'USA',
      typicalYield: 3.4,
      typicalGrowth: 5.8,
      ter: 0.06,
      risk: 'medium',
      styles: ['balanced', 'growth'],
      fitNote: 'Focus on quality dividend growers with strong historical payout growth.'
    },
    {
      ticker: 'VHYL',
      name: 'Vanguard FTSE All-World High Dividend Yield UCITS ETF',
      type: 'etf',
      region: 'Europe',
      typicalYield: 3.7,
      typicalGrowth: 3.2,
      ter: 0.29,
      risk: 'medium',
      styles: ['income', 'balanced'],
      fitNote: 'Global diversification with higher distribution focus across developed markets.'
    },
    {
      ticker: 'FUSD',
      name: 'Fidelity US Quality Income UCITS ETF',
      type: 'etf',
      region: 'Europe',
      typicalYield: 2.4,
      typicalGrowth: 5.2,
      ter: 0.25,
      risk: 'medium',
      styles: ['growth', 'balanced'],
      fitNote: 'Quality approach with sustainable payout and stronger long-term growth profile.'
    },
    {
      ticker: 'O',
      name: 'Realty Income',
      type: 'reit',
      region: 'USA',
      typicalYield: 5.1,
      typicalGrowth: 3.0,
      ter: 0.0,
      risk: 'medium',
      styles: ['income'],
      fitNote: 'Cash-flow-oriented REIT profile with frequent distributions.'
    },
    {
      ticker: 'ENEL',
      name: 'Enel',
      type: 'stock',
      region: 'Europe',
      typicalYield: 5.6,
      typicalGrowth: 2.6,
      ter: 0.0,
      risk: 'medium',
      styles: ['income', 'balanced'],
      fitNote: 'European utility profile with higher yield and historically contained volatility.'
    },
    {
      ticker: 'JNJ',
      name: 'Johnson & Johnson',
      type: 'stock',
      region: 'USA',
      typicalYield: 3.1,
      typicalGrowth: 5.0,
      ter: 0.0,
      risk: 'low',
      styles: ['balanced', 'growth'],
      fitNote: 'Dividend aristocrat with a long track record of payout growth.'
    },
    {
      ticker: 'AIR',
      name: 'Air Liquide',
      type: 'stock',
      region: 'Europe',
      typicalYield: 2.0,
      typicalGrowth: 7.0,
      ter: 0.0,
      risk: 'medium',
      styles: ['growth'],
      fitNote: 'Lower starting yield but typically stronger earnings and dividend growth.'
    },
    {
      ticker: 'JEPI',
      name: 'JPMorgan Equity Premium Income ETF',
      type: 'etf',
      region: 'USA',
      typicalYield: 7.2,
      typicalGrowth: 1.5,
      ter: 0.35,
      risk: 'high',
      styles: ['income'],
      fitNote: 'Heavily oriented to current income rather than long-term growth.'
    },
    {
      ticker: 'HD',
      name: 'Home Depot',
      type: 'stock',
      region: 'USA',
      typicalYield: 2.4,
      typicalGrowth: 7.5,
      ter: 0.0,
      risk: 'medium',
      styles: ['balanced', 'growth'],
      fitNote: 'Quality cyclical stock with growing dividend profile and strong cash flow.'
    },
    {
      ticker: 'CSCO',
      name: 'Cisco Systems',
      type: 'stock',
      region: 'USA',
      typicalYield: 3.0,
      typicalGrowth: 5.5,
      ter: 0.0,
      risk: 'medium',
      styles: ['income', 'balanced'],
      fitNote: 'Mature tech profile offering solid income and moderate earnings growth.'
    },
    {
      ticker: 'BND',
      name: 'Vanguard Total Bond Market ETF',
      type: 'etf',
      region: 'USA',
      typicalYield: 2.8,
      typicalGrowth: 1.5,
      ter: 0.03,
      risk: 'low',
      styles: ['income'],
      fitNote: 'Core bond ETF useful for stabilizing income-focused portfolios.'
    },
    {
      ticker: 'QQQ',
      name: 'Invesco QQQ Trust',
      type: 'etf',
      region: 'USA',
      typicalYield: 0.6,
      typicalGrowth: 10.5,
      ter: 0.20,
      risk: 'high',
      styles: ['growth'],
      fitNote: 'Strong growth-tech exposure with focus on capital appreciation.'
    },
    {
      ticker: 'IBM',
      name: 'IBM',
      type: 'stock',
      region: 'USA',
      typicalYield: 4.1,
      typicalGrowth: 3.5,
      ter: 0.0,
      risk: 'medium',
      styles: ['income', 'balanced'],
      fitNote: 'Higher yield with modest growth, suitable for income-oriented strategies.'
    },
    {
      ticker: 'MO',
      name: 'Altria Group',
      type: 'stock',
      region: 'USA',
      typicalYield: 8.3,
      typicalGrowth: 2.0,
      ter: 0.0,
      risk: 'medium',
      styles: ['income'],
      fitNote: 'Yield molto elevato con crescita limitata e forte focus sul cash flow.'
    },
    {
      ticker: 'BTI',
      name: 'British American Tobacco',
      type: 'stock',
      region: 'Europa',
      typicalYield: 7.9,
      typicalGrowth: 2.2,
      ter: 0.0,
      risk: 'medium',
      styles: ['income'],
      fitNote: 'Titolo ad alto dividendo con elevata efficienza generativa.'
    },
    {
      ticker: 'PFE',
      name: 'Pfizer',
      type: 'stock',
      region: 'USA',
      typicalYield: 6.1,
      typicalGrowth: 3.0,
      ter: 0.0,
      risk: 'medium',
      styles: ['income', 'balanced'],
      fitNote: 'Yield sostenuto con crescita moderata e volatilita contenuta.'
    },
    {
      ticker: 'MPW',
      name: 'Medical Properties Trust',
      type: 'reit',
      region: 'USA',
      typicalYield: 10.5,
      typicalGrowth: 1.5,
      ter: 0.0,
      risk: 'high',
      styles: ['income'],
      fitNote: 'REIT ad alto reddito con rischio operativo elevato.'
    },
    {
      ticker: 'XYLD',
      name: 'Global X S&P 500 Covered Call ETF',
      type: 'etf',
      region: 'USA',
      typicalYield: 8.6,
      typicalGrowth: 1.2,
      ter: 0.60,
      risk: 'high',
      styles: ['income'],
      fitNote: 'ETF orientato al reddito tramite strategie covered call.'
    },
    {
      ticker: 'NVDA',
      name: 'NVIDIA',
      type: 'stock',
      region: 'USA',
      typicalYield: 0.04,
      typicalGrowth: 18.0,
      ter: 0.0,
      risk: 'high',
      styles: ['growth'],
      fitNote: 'Crescita strutturale elevata guidata da AI e semiconduttori avanzati.'
    },
    {
      ticker: 'TSLA',
      name: 'Tesla',
      type: 'stock',
      region: 'USA',
      typicalYield: 0.0,
      typicalGrowth: 20.0,
      ter: 0.0,
      risk: 'high',
      styles: ['growth'],
      fitNote: 'Titolo growth puro con forte volatilita e potenziale di lungo periodo.'
    },
    {
      ticker: 'AMD',
      name: 'Advanced Micro Devices',
      type: 'stock',
      region: 'USA',
      typicalYield: 0.0,
      typicalGrowth: 16.0,
      ter: 0.0,
      risk: 'high',
      styles: ['growth'],
      fitNote: 'Espansione rapida nei semiconduttori ad alte prestazioni.'
    },
    {
      ticker: 'SHOP',
      name: 'Shopify',
      type: 'stock',
      region: 'USA',
      typicalYield: 0.0,
      typicalGrowth: 17.5,
      ter: 0.0,
      risk: 'high',
      styles: ['growth'],
      fitNote: 'Crescita sostenuta legata all’e-commerce globale.'
    },
    {
      ticker: 'CRWD',
      name: 'CrowdStrike',
      type: 'stock',
      region: 'USA',
      typicalYield: 0.0,
      typicalGrowth: 19.0,
      ter: 0.0,
      risk: 'high',
      styles: ['growth'],
      fitNote: 'Cybersecurity ad alta crescita con modello scalabile.'
    }
  ];

  function getScenarioStyle(growthPct) {
    if (growthPct < 2.5) return 'income';
    if (growthPct < 4.8) return 'balanced';
    return 'growth';
  }

  function buildRecommendationProfile(params, p50) {
    const requiredNetYieldPct = p50 > 0 ? ((params.targetMonthly * 12) / p50) * 100 : 0;
    const growthPct = params.growthMean * 100;
    const inflationPct = params.inflation * 100;
    const targetRealGrowthPct = growthPct - inflationPct;
    const volPct = params.growthStd * 100;
    const netYieldPct = Math.max(0.1, (params.divYield * (1 - params.taxRate) - params.expenseRatio) * 100);
    const yieldBias = requiredNetYieldPct >= 4.5 ? 1 : requiredNetYieldPct >= 3 ? 0.65 : 0.35;
    const growthBias = params.years >= 15 ? 1 : params.years >= 8 ? 0.7 : 0.45;

    return {
      growthPct,
      inflationPct,
      targetRealGrowthPct,
      volPct,
      netYieldPct,
      requiredNetYieldPct,
      capitalMedian: p50,
      years: params.years,
      yieldBias,
      growthBias,
      style: getScenarioStyle(growthPct)
    };
  }

  function riskLevelValue(risk) {
    if (risk === 'low') return 1;
    if (risk === 'high') return 3;
    return 2;
  }

  function computeInstrumentMetrics(inst, profile, params) {
    const instNetYieldPct = Math.max(0.1, (inst.typicalYield * (1 - params.taxRate)) - inst.ter);
    const instRealGrowthPct = inst.typicalGrowth - profile.inflationPct;
    const incomeSlack = instNetYieldPct - profile.requiredNetYieldPct;
    const growthSlack = instRealGrowthPct - profile.targetRealGrowthPct;
    const blendedReturn = (instNetYieldPct * 0.62) + (instRealGrowthPct * 0.38);

    return {
      instNetYieldPct,
      instRealGrowthPct,
      incomeSlack,
      growthSlack,
      blendedReturn,
      yieldGap: Math.abs(instNetYieldPct - profile.netYieldPct),
      realGrowthGap: Math.abs(instRealGrowthPct - profile.targetRealGrowthPct)
    };
  }

  function scoreInstrument(inst, profile, params, metrics) {
    let score = 0;
    const yieldWeight = profile.years <= 5 ? 2.45 : profile.years >= 15 ? 1.15 : 1.7;
    const growthWeight = profile.years <= 5 ? 0.85 : profile.years >= 15 ? 1.8 : 1.25;
    const costWeight = profile.years >= 10 ? 5.0 : 3.6;

    score += metrics.yieldGap * yieldWeight;
    score += metrics.realGrowthGap * growthWeight;
    score += inst.ter * costWeight;

    if (!inst.styles.includes(profile.style)) score += 1.7;
    const riskValue = riskLevelValue(inst.risk);
    if (profile.volPct < 6 && riskValue >= 3) score += 2.1;
    if (profile.volPct > 12 && riskValue <= 1) score += 0.8;
    if (params.taxRate > 0.28 && inst.type === 'reit') score += 0.7;
    if (params.taxRate > 0.3 && inst.typicalYield > 5.0) score += 0.9;

    if (metrics.incomeSlack < 0) {
      score += Math.abs(metrics.incomeSlack) * profile.yieldBias;
    } else {
      score -= Math.min(0.8, metrics.incomeSlack * 0.16);
    }

    if (metrics.growthSlack < 0) {
      score += Math.abs(metrics.growthSlack) * profile.growthBias;
    } else {
      score -= Math.min(0.5, metrics.growthSlack * 0.08);
    }

    if (metrics.instNetYieldPct < profile.requiredNetYieldPct) {
      score += Math.min(2.2, (profile.requiredNetYieldPct - metrics.instNetYieldPct) * 0.9);
    } else {
      score -= Math.min(0.7, (metrics.instNetYieldPct - profile.requiredNetYieldPct) * 0.18);
    }

    if (profile.years <= 5 && inst.typicalYield < 2.2) score += 1.0;
    if (profile.years >= 15 && inst.typicalGrowth < 3.0) score += 0.9;

    return score;
  }

  function getRecommendationReason(profile, inst, metrics) {
    if (metrics.yieldGap <= 0.45 && metrics.realGrowthGap <= 1.2) {
      return 'Strong alignment between net yield, real growth, and your selected horizon.';
    }
    if (metrics.incomeSlack >= 0.4) {
      return 'Estimated net yield exceeds scenario requirement with a useful safety buffer.';
    }
    if (profile.style === 'income' && metrics.instNetYieldPct >= profile.requiredNetYieldPct) {
      return 'Fits an income setup with better expected coverage of cash-flow needs.';
    }
    if (metrics.growthSlack >= 1.0 && profile.style === 'growth') {
      return 'Fits a growth setup with expected real dividend growth above your target.';
    }
    if (inst.ter <= 0.1) {
      return 'Lower costs help preserve compounding efficiency over longer horizons.';
    }
    if (profile.style === 'income') {
      return 'Income-oriented setup: prioritize distribution stability and reliable net yield.';
    }
    if (profile.style === 'growth') {
      return 'Growth-oriented setup: prioritize long-term dividend growth potential.';
    }
    return 'Balanced setup: blend current net yield and future dividend growth.';
  }

  function typeLabel(type) {
    if (type === 'etf') return 'ETF';
    if (type === 'reit') return 'REIT';
    return 'STOCK';
  }

  function renderRecommendations(params, p50, helpers) {
    const profile = buildRecommendationProfile(params, p50);
    const grid = document.getElementById('recommendationsGrid');
    const chips = document.getElementById('recProfile');

    if (!grid || !chips) return;

    const fmtCurrency = helpers && helpers.fmtCurrency ? helpers.fmtCurrency : function (v) { return String(Math.round(v)); };
    const fmtCurrencyCompact = helpers && helpers.fmtCurrencyCompact
      ? helpers.fmtCurrencyCompact
      : function (v) { return String(Math.round(v)); };

    const ranked = REAL_INSTRUMENTS
      .map(function (inst) {
        const metrics = computeInstrumentMetrics(inst, profile, params);
        return { inst: inst, metrics: metrics, score: scoreInstrument(inst, profile, params, metrics) };
      })
      .sort(function (a, b) { return a.score - b.score; })
      .slice(0, 6);

    chips.innerHTML = [
      '<span class="rec-chip">Target growth: ' + profile.growthPct.toFixed(1) + '%</span>',
      '<span class="rec-chip">Target net yield: ' + profile.netYieldPct.toFixed(2) + '%</span>',
      '<span class="rec-chip">Minimum required yield: ' + profile.requiredNetYieldPct.toFixed(2) + '%</span>',
      '<span class="rec-chip">Median capital: ' + fmtCurrencyCompact(profile.capitalMedian) + '</span>'
    ].join('');

    grid.innerHTML = ranked.map(function (row, index) {
      const inst = row.inst;
      const metrics = row.metrics;
      const monthlyTaxEstimate = (p50 * (inst.typicalYield / 100) * params.taxRate) / 12;
      const matchScore = Math.max(45, Math.min(98, Math.round(100 - (row.score * 7.5))));
      const reason = getRecommendationReason(profile, inst, metrics);
      const yieldDelta = metrics.incomeSlack >= 0 ? '+' + metrics.incomeSlack.toFixed(2) : metrics.incomeSlack.toFixed(2);
      const growthDelta = metrics.growthSlack >= 0 ? '+' + metrics.growthSlack.toFixed(1) : metrics.growthSlack.toFixed(1);
      return '' +
        '<article class="rec-card ' + inst.type + '">' +
        (index === 0 ? '<span class="rec-top-flag">top match</span>' : '') +
        '<div class="rec-row">' +
        '<div>' +
        '<h3 class="rec-ticker">' + inst.ticker + '</h3>' +
        '<p class="rec-name">' + inst.name + ' · ' + inst.region + '</p>' +
        '</div>' +
        '<span class="rec-type">' + typeLabel(inst.type) + '</span>' +
        '</div>' +
        '<div class="rec-stats">' +
        '<div class="rec-stat"><div class="rec-stat-label">Net yield</div><div class="rec-stat-value highlight">' + metrics.instNetYieldPct.toFixed(2) + '%</div><div class="rec-stat-sub">Target ' + profile.requiredNetYieldPct.toFixed(2) + '% · gap ' + yieldDelta + '%</div></div>' +
        '<div class="rec-stat"><div class="rec-stat-label">Real growth</div><div class="rec-stat-value">' + metrics.instRealGrowthPct.toFixed(1) + '%</div><div class="rec-stat-sub">Target ' + profile.targetRealGrowthPct.toFixed(1) + '% · gap ' + growthDelta + '%</div></div>' +
        '<div class="rec-stat"><div class="rec-stat-label">Annual costs</div><div class="rec-stat-value">' + inst.ter.toFixed(2) + '%</div><div class="rec-stat-sub">Long-term compounding drag</div></div>' +
        '</div>' +
        '<p class="rec-fit">Match ' + matchScore + '/100 · ' + reason + '</p>' +
        '<p class="rec-note">' + inst.fitNote + ' Estimated monthly tax impact in the median scenario: ' + fmtCurrency(monthlyTaxEstimate) + '.</p>' +
        '</article>';
    }).join('');

    if (helpers && typeof helpers.trackEvent === 'function') {
      helpers.trackEvent('recommendations_generated', {
        style: profile.style,
        growth_target: profile.growthPct,
        net_yield_target: profile.netYieldPct,
        listed: ranked.length
      });
    }
  }

  global.RecommendationEngine = {
    dataset: REAL_INSTRUMENTS,
    renderRecommendations: renderRecommendations
  };
})(window);
