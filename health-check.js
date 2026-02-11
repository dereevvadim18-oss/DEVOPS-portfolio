/**
 * Функции для проверки работоспособности приложения
 */

// Проверка доступности основных ресурсов
async function checkResourcesAvailability() {
  const resources = [
    { name: 'HTML', url: 'index.html' },
    { name: 'CSS', url: 'style.css' },
  ];
  
  const results = {
    timestamp: new Date().toISOString(),
    resources: [],
    status: 'healthy'
  };
  
  for (const resource of resources) {
    try {
      const response = await fetch(resource.url, { method: 'HEAD' });
      results.resources.push({
        name: resource.name,
        url: resource.url,
        status: response.ok ? 'available' : 'unavailable',
        code: response.status
      });
      if (!response.ok) results.status = 'degraded';
    } catch (error) {
      results.resources.push({
        name: resource.name,
        url: resource.url,
        status: 'error',
        error: error.message
      });
      results.status = 'unhealthy';
    }
  }
  
  return results;
}

// Проверка производительности DOM
function checkDOMPerformance() {
  const results = {
    timestamp: new Date().toISOString(),
    metrics: {}
  };
  
  // Проверка размера DOM
  const elementCount = document.getElementsByTagName('*').length;
  results.metrics.totalElements = elementCount;
  results.metrics.domHealthy = elementCount < 10000;
  
  // Проверка памяти (если доступно)
  if (performance.memory) {
    results.metrics.memory = {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB'
    };
  }
  
  // Проверка времени загрузки
  const perfData = performance.timing;
  if (perfData) {
    results.metrics.loadTime = perfData.loadEventEnd - perfData.navigationStart + ' ms';
  }
  
  return results;
}

// Проверка доступности сети
async function checkNetworkConnectivity() {
  const results = {
    timestamp: new Date().toISOString(),
    online: navigator.onLine,
    connectionType: navigator.connection?.effectiveType || 'unknown',
    downlink: navigator.connection?.downlink || null
  };
  
  return results;
}

// Комплексная проверка приложения
async function healthCheck() {
  console.log('🔍 Запуск проверки здоровья приложения...');
  
  const report = {
    timestamp: new Date().toISOString(),
    application: 'Portfolio DevOps',
    checks: {},
    overallStatus: 'healthy'
  };
  
  // Проверка ресурсов
  console.log('📦 Проверка ресурсов...');
  report.checks.resources = await checkResourcesAvailability();
  
  // Проверка DOM
  console.log('🎯 Проверка DOM...');
  report.checks.dom = checkDOMPerformance();
  
  // Проверка сети
  console.log('🌐 Проверка сети...');
  report.checks.network = await checkNetworkConnectivity();
  
  // Определение общего статуса
  if (report.checks.resources.status === 'unhealthy' || !report.checks.network.online) {
    report.overallStatus = 'unhealthy';
  } else if (report.checks.resources.status === 'degraded' || !report.checks.dom.metrics.domHealthy) {
    report.overallStatus = 'degraded';
  }
  
  console.table(report);
  return report;
}

// Автоматическая проверка каждые 30 секунд
function startHealthCheckInterval(intervalMs = 30000) {
  console.log(`⏱️ Здоровье приложения будет проверяться каждые ${intervalMs / 1000} сек`);
  
  setInterval(async () => {
    const report = await healthCheck();
    console.log(`✅ Статус: ${report.overallStatus.toUpperCase()}`);
  }, intervalMs);
}

// Слушатели событий для мониторинга
window.addEventListener('online', () => {
  console.log('✅ Соединение восстановлено');
});

window.addEventListener('offline', () => {
  console.log('❌ Соединение потеряно');
});

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    checkResourcesAvailability,
    checkDOMPerformance,
    checkNetworkConnectivity,
    healthCheck,
    startHealthCheckInterval
  };
}
