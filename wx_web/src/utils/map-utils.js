export function getLocation(address) {
  return new Promise((resolve, reject) => {
    function getLocationByGaode() {
      if (!window.AMap) {
        setTimeout(getLocationByGaode, 10);
        return;
      }

      const div = document.createElement('div');
      const map = new window.AMap.Map(div);
      map.plugin('AMap.Geocoder', () => {
        new window.AMap.Geocoder().getLocation(address, (status, result) => {
          if (status === 'complete') {
            resolve(result.geocodes[0].addressComponent);
          } else if (status === 'error') {
            reject(result);
          } else {
            resolve({});
          }
        });
      });
    }

    require('gaode').then(getLocationByGaode); // eslint-disable-line
  });
}
