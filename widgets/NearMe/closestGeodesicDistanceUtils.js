// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define(["esri/SpatialReference","esri/geometry/Polygon","esri/geometry/Polyline","esri/geometry/geometryEngine","esri/geometry/webMercatorUtils"],function(v,w,x,l,n){var g={getGeodesicDistance:function(b,a,d){var c=0;if(!b||!a||l.intersects(b,a))return 0;var e=new v(4326);n.canProject(b,e)&&n.canProject(a,e)&&(b=n.project(b,e),a=n.project(a,e),"point"===b.type?"point"===a.type?c=g.getGeodesicDistanceBetweenPointToPoint(b,a):"polyline"===a.type?c=g.getGeodesicDistanceBetweenPointToLine(b,a):"polygon"===
a.type&&(c=g.getGeodesicDistanceBetweenPointToPolygon(b,a)):"polyline"===b.type?"point"===a.type?c=g.getGeodesicDistanceBetweenPointToLine(a,b):"polyline"===a.type?c=g.getGeodesicDistanceBetweenLineToLine(b,a):"polygon"===a.type&&(c=g.getGeodesicDistanceBetweenLineToPolygon(b,a)):"polygon"===b.type&&("point"===a.type?c=g.getGeodesicDistanceBetweenPointToPolygon(a,b):"polyline"===a.type?c=g.getGeodesicDistanceBetweenLineToPolygon(a,b):"polygon"===a.type&&(c=g.getGeodesicDistanceBetweenPolygonToPolygon(b,
a))),d&&(c=g.convertSingle(c,d)));return c},getGeodesicDistanceBetweenPolygonToPolygon:function(b,a){if(l.intersects(b,a))return 0;var d,c;for(d=0;d<b.rings.length;d++)for(c=0;c<b.rings[d].length;c++){var e=b.getPoint(d,c);e=g.getGeodesicDistanceBetweenPointToPolygon(e,a);if(void 0===f||e<f)var f=e}for(d=0;d<a.rings.length;d++)for(c=0;c<a.rings[d].length;c++)if(e=a.getPoint(d,c),e=g.getGeodesicDistanceBetweenPointToPolygon(e,b),void 0===f||e<f)f=e;return f},getGeodesicDistanceBetweenLineToPolygon:function(b,
a){var d,c;if(l.intersects(b,a))return 0;for(d=0;d<b.paths.length;d++)for(c=0;c<b.paths[d].length;c++){var e=b.getPoint(d,c);e=g.getGeodesicDistanceBetweenPointToPolygon(e,a);if(void 0===f||e<f)var f=e}for(d=0;d<a.rings.length;d++)for(c=0;c<a.rings[d].length;c++)if(e=a.getPoint(d,c),e=g.getGeodesicDistanceBetweenPointToLine(e,b),void 0===f||e<f)f=e;return f},getGeodesicDistanceBetweenLineToLine:function(b,a){var d,c;if(l.intersects(b,a))return 0;for(d=0;d<b.paths.length;d++)for(c=0;c<b.paths[d].length;c++){var e=
b.getPoint(d,c);e=g.getGeodesicDistanceBetweenPointToLine(e,a);if(void 0===f||e<f)var f=e}for(d=0;d<a.paths.length;d++)for(c=0;c<a.paths[d].length;c++)if(e=a.getPoint(d,c),e=g.getGeodesicDistanceBetweenPointToLine(e,b),void 0===f||e<f)f=e;return f},getGeodesicDistanceBetweenPointToPolygon:function(b,a){var d;if(0<a.rings.length)for(d=0;d<a.rings.length;d++){var c=new w({rings:[a.rings[d]],spatialReference:a.spatialReference});c=l.nearestCoordinate(c,b).coordinate;c=g.getGeodesicDistanceBetweenPointToPoint(b,
c);if(void 0===e||c<e)var e=c}return e},getGeodesicDistanceBetweenPointToLine:function(b,a){var d;if(0<a.paths.length)for(d=0;d<a.paths.length;d++){var c=new x({paths:[a.paths[d]],spatialReference:a.spatialReference});c=l.nearestCoordinate(c,b).coordinate;c=g.getGeodesicDistanceBetweenPointToPoint(b,c);if(void 0===e||c<e)var e=c}return e},getGeodesicDistanceBetweenPointToPoint:function(b,a){b=g.getDistance(b,a);return isNaN(b)?0:b},getDistance:function(b,a){var d=a.x*Math.PI/180-b.x*Math.PI/180,c=
.9966471893352243*Math.tan(b.y*Math.PI/180);b=1/Math.sqrt(1+c*c);c*=b;var e=.9966471893352243*Math.tan(a.y*Math.PI/180);a=1/Math.sqrt(1+e*e);var f=e*a,m=d,t=0;do{var h=Math.sin(m);var k=Math.cos(m);e=a*h*a*h+(b*f-c*a*k)*(b*f-c*a*k);e=Math.sqrt(e);if(0==e)return{distance:0,initialBearing:0,finalBearing:0};k=c*f+b*a*k;var u=Math.atan2(e,k);var q=b*a*h/e;var p=1-q*q;h=k-2*c*f/p;isNaN(h)&&(h=0);var r=2.0955066654848088E-4*p*(4+.003352810664775694*(4-3*p));var y=m;m=d+.003352810664775694*(1-r)*q*(u+r*
e*(h+r*k*(-1+2*h*h)))}while(1E-12<Math.abs(m-y)&&200>++t);if(200<=t)return null;d=2.7233160610984375E11*p/4.040829998465916E13;b=d/1024*(256+d*(-128+d*(74-47*d)));return d=Number((6356752.314245*(1+d/16384*(4096+d*(-768+d*(320-175*d))))*(u-b*e*(h+b/4*(k*(-1+2*h*h)-b/6*h*(-3+4*e*e)*(-3+4*h*h))))).toFixed(3))},convertSingle:function(b,a){return"meters"===a?+b:+b/g.perMeter("meters")*g.perMeter(a)},perMeter:function(b){var a=1;switch(b){case "meters":a=1;break;case "kilometers":a=.001;break;case "feet":a=
1/.3048;break;case "yards":a=1/.9144;break;case "miles":a=1/1609.344}return a}};return g});