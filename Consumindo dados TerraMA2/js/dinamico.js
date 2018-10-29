var centroDoMapa = L.latLng({
    lat: -23.2069378,
    lng: -45.8633681
});

var opcoesDoMapa = {
    center: centroDoMapa,
    zoom: 8,
};

var mapa = L.map('mapa', opcoesDoMapa);

var camadaDeBaseOSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mapa);

var servidorWMSDoTerraMA2 = 'http://www.terrama2.dpi.inpe.br/geoserver/ows';
var atribuicaoDoTerraMA2 = '&copy; <a href="http://www.dpi.inpe.br/terrama2/">TerraMA²</a>';

var camadaDeEstados = L.tileLayer.wms(servidorWMSDoTerraMA2, {
    attribution: atribuicaoDoTerraMA2,
    layers: 'terrama2_3:view3',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    crs: L.CRS.EPSG4326,
});

var inicio = moment().subtract(1, 'days').toISOString();
var fim = moment().toISOString();

var camadaDeFocosDeCalor = L.tileLayer.wms(servidorWMSDoTerraMA2, {
    attribution: atribuicaoDoTerraMA2,
    layers: 'terrama2_6:view6',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    crs: L.CRS.EPSG4326,
    time: inicio + '/' + fim,
}).addTo(mapa);

var camadasDeBase = {
    'OpenStreetMap': camadaDeBaseOSM,
};

var camadasDeSobreposicao = {
    'Estados brasileiros': camadaDeEstados,
    'Focos de calor (últimas 24h)': camadaDeFocosDeCalor,
};

L.control.layers(camadasDeBase, camadasDeSobreposicao).addTo(mapa);