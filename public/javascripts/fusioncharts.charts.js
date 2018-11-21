/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.7.1
*/
FusionCharts.register("module", ["private", "modules.renderer.js-charts", function () {
    function Da(a) {
        var p = {left: a.offsetLeft, top: a.offsetTop};
        for (a = a.offsetParent; a;) p.left += a.offsetLeft, p.top += a.offsetTop, a !== Ka.body && a !== Ka.documentElement && (p.left -= a.scrollLeft, p.top -= a.scrollTop), a = a.offsetParent;
        return p
    }

    function pa(a, p) {
        for (var c = [], d = 0, k = a.length; d < k; d++) c[d] = p.call(a[d], a[d], d, a);
        return c
    }

    function ia(a, p) {
        var c = p ? 360 : T;
        a = (a || 0) % c;
        return 0 > a ? c + a : a
    }

    function La(a, p) {
        return a <= A ? a : p <= A ? p : p > a ? 0 : p
    }

    function Pa(a, p, c, d, k) {
        return aa((p - c[1] - d.top) / k, a - c[0] - d.left)
    }

    function Ma(a, p, c, d, k, b, s, ca, e, r) {
        "object" === typeof a && (p = a.y, c = a.r, d = a.innerR, k = a.radiusYFactor, b = a.depth, s = a.seriesGroup, ca = a.renderer, a = a.x);
        if (0 > k || 1 <= k) k = .6;
        a = a || 0;
        p = p || 0;
        c = c || 1;
        d = d || 0;
        b = b || 0;
        this.renderer = ca;
        this.hasOnePoint = e;
        this.use3DLighting = r;
        this.cx = a;
        this.cy = p;
        this.rx = c;
        this.ry = c * k;
        this.radiusYFactor = k;
        this.isDoughnut = 0 < d;
        this.innerRx = d;
        this.innerRy = d * k;
        this.depth = b;
        this.leftX = a - c;
        this.rightX = a + c;
        this.leftInnerX = a - d;
        this.rightInnerX =
            a + d;
        this.depthY = p + b;
        this.topY = p - this.ry;
        this.bottomY = this.depthY + this.ry;
        this.bottomBorderGroup = ca.group("bottom-border", s).attr({transform: "t0," + b});
        this.outerBackGroup = ca.group("outer-back-Side", s);
        this.slicingWallsBackGroup = ca.group("slicingWalls-back-Side", s);
        this.innerBackGroup = ca.group("inner-back-Side", s);
        this.innerFrontGroup = ca.group("inner-front-Side", s);
        this.slicingWallsFrontGroup = ca.group("slicingWalls-front-Side", s);
        this.topGroup = ca.group("top-Side", s);
        this.moveCmdArr = ["M"];
        this.lineCmdArr =
            ["L"];
        this.closeCmdArr = ["Z"];
        this.centerPoint = [a, p];
        this.leftPoint = [this.leftX, p];
        this.topPoint = [a, this.topY];
        this.rightPoint = [this.rightX, p];
        this.bottomPoint = [a, p + this.ry];
        this.leftDepthPoint = [this.leftX, this.depthY];
        this.rightDepthPoint = [this.rightX, this.depthY];
        this.leftInnerPoint = [this.leftInnerX, p];
        this.rightInnerPoint = [this.rightInnerX, p];
        this.leftInnerDepthPoint = [this.leftInnerX, this.depthY];
        this.rightInnerDepthPoint = [this.rightInnerX, this.depthY];
        this.pointElemStore = [];
        this.slicingWallsArr =
            [];
        a = ["A", this.rx, this.ry, 0, 0, 1, this.rightX, p];
        c = ["A", this.rx, this.ry, 0, 0, 1, this.leftX, p];
        d = ["A", this.rx, this.ry, 0, 0, 0, this.rightX, this.depthY];
        k = ["A", this.rx, this.ry, 0, 0, 0, this.leftX, this.depthY];
        b = ["A", this.innerRx, this.innerRy, 0, 0, 0, this.rightInnerX, p];
        p = ["A", this.innerRx, this.innerRy, 0, 0, 0, this.leftInnerX, p];
        s = ["A", this.innerRx, this.innerRy, 0, 0, 1, this.rightInnerX, this.depthY];
        ca = ["A", this.innerRx, this.innerRy, 0, 0, 1, this.leftInnerX, this.depthY];
        this.isDoughnut ? (this.topBorderPath = this.moveCmdArr.concat(this.leftPoint,
            a, c, this.moveCmdArr, this.leftInnerPoint, b, p), this.topPath = this.moveCmdArr.concat(this.leftPoint, a, c, this.lineCmdArr, this.leftInnerPoint, b, p, this.closeCmdArr), this.innerFrontPath = this.moveCmdArr.concat(this.leftInnerPoint, b, this.lineCmdArr, this.rightInnerDepthPoint, ca, this.closeCmdArr), this.innerBackPath = this.moveCmdArr.concat(this.rightInnerPoint, p, this.lineCmdArr, this.leftInnerDepthPoint, s, this.closeCmdArr)) : this.topBorderPath = this.topPath = this.moveCmdArr.concat(this.leftPoint, a, c, this.closeCmdArr);
        this.outerBackPath = this.moveCmdArr.concat(this.leftPoint, a, this.lineCmdArr, this.rightDepthPoint, k, this.closeCmdArr);
        this.outerFrontPath = this.moveCmdArr.concat(this.rightPoint, c, this.lineCmdArr, this.leftDepthPoint, d, this.closeCmdArr);
        this.clipPathforOuter = ["M", this.leftX, this.topY, "L", this.rightX, this.topY, this.rightX, this.bottomY, this.leftX, this.bottomY, "Z"];
        this.clipPathforInner = ["M", this.leftInnerX, this.topY, "L", this.rightInnerX, this.topY, this.rightInnerX, this.bottomY, this.leftInnerX, this.bottomY,
            "Z"];
        this.clipPathforNoClip = ["M", this.leftInnerX, this.topY, "L", this.leftInnerX, this.bottomY, "Z"];
        this.colorObjs = []
    }

    var ea = this, D = ea.hcLib, ga = D.Raphael, m = ea.window, Ka = m.document, Z = D.BLANKSTRING,
        Xa = D.createTrendLine, g = D.pluck, wa = D.getValidValue, Ia = D.parseTooltext, f = D.pluckNumber,
        Ja = D.getFirstValue, Ua = D.getDefinedColor, oa = D.parseUnsafeString, ta = D.FC_CONFIG_STRING, xa = D.extend2,
        Ea = D.getDashStyle, J = D.toRaphaelColor, Na = D.toPrecision, Oa = D.stubFN, ka = D.hasSVG, Aa = D.each,
        ya = D.TOUCH_THRESHOLD_PIXELS, Qa = D.CLICK_THRESHOLD_PIXELS,
        za = D.plotEventHandler, b = D.hasTouch ? ya : Qa, e = "rgba(192,192,192," + (D.isIE ? .002 : 1E-6) + ")",
        h = 8 === m.document.documentMode ? "visible" : "", B = Math, E = B.sin, w = B.cos, aa = B.atan2, u = B.round,
        t = B.min, q = B.max, ha = B.abs, H = B.PI, C = B.ceil, L = B.floor, K = B.sqrt, N = H / 180, O = 180 / H,
        A = Math.PI, Ya = A / 2, T = 2 * A, Za = A + Ya, Ba = D.graphics.getColumnColor, da = D.getFirstColor,
        ba = D.setLineHeight, Va = D.pluckFontSize, Fa = D.getFirstAlpha, fa = D.graphics.getDarkColor,
        ma = D.graphics.getLightColor, la = D.graphics.convertColor, Ra = D.COLOR_TRANSPARENT, Wa = D.POSITION_CENTER,
        bb = D.POSITION_TOP, $a = D.POSITION_BOTTOM, cb = D.POSITION_RIGHT, db = D.POSITION_LEFT,
        eb = D.parsexAxisStyles, ab = D.hashify, n = D.chartAPI, Ha = D.graphics.mapSymbolName, ya = n.singleseries,
        $ = D.COMMASTRING, ra = D.ZEROSTRING, Ga = D.ONESTRING, Ca = D.HUNDREDSTRING, Sa = D.PXSTRING,
        fb = D.COMMASPACE, sa = !/fusioncharts\.com$/i.test(m.location.hostname);
    n("column2d", {
        standaloneInit: !0,
        friendlyName: "Column Chart",
        creditLabel: sa,
        rendererId: "cartesian"
    }, n.column2dbase);
    n("column3d", {
        friendlyName: "3D Column Chart", defaultSeriesType: "column3d",
        defaultPlotShadow: 1, is3D: !0, fireGroupEvent: !0, defaultZeroPlaneHighlighted: !1
    }, n.column2d);
    n("bar2d", {friendlyName: "Bar Chart", isBar: !0, defaultSeriesType: "bar", spaceManager: n.barbase}, n.column2d);
    n("bar3d", {
        friendlyName: "3D Bar Chart",
        defaultSeriesType: "bar3d",
        defaultPlotShadow: 1,
        fireGroupEvent: !0,
        is3D: !0,
        defaultZeroPlaneHighlighted: !1
    }, n.bar2d);
    n("line", {friendlyName: "Line Chart", standaloneInit: !0, creditLabel: sa, rendererId: "cartesian"}, n.linebase);
    n("area2d", {
        friendlyName: "Area Chart", standaloneInit: !0,
        creditLabel: sa, rendererId: "cartesian"
    }, n.area2dbase);
    n("pie2d", {
        friendlyName: "Pie Chart",
        standaloneInit: !0,
        defaultSeriesType: "pie",
        defaultPlotShadow: 1,
        reverseLegend: 1,
        alignCaptionWithCanvas: 0,
        sliceOnLegendClick: !0,
        rendererId: "pie",
        point: function (a, p, c, d, k) {
            a = k[ta];
            var b = this.colorManager, s = a.is3d, ca = f(d.plotborderthickness), e = f(ca, s ? .1 : 1),
                r = f(d.enablemultislicing, 1), Q = f(d.use3dlighting, 1),
                l = Q ? f(d.radius3d, d["3dradius"], 90) : 100, h = f(d.showzeropies, 1),
                B = f(d.showpercentintooltip, 1), na = f(d.showlabels,
                1), G = f(d.showvalues, 1), n = f(d.showpercentvalues, d.showpercentagevalues, 0),
                x = g(d.tooltipsepchar, d.hovercapsepchar, fb), gb = g(d.labelsepchar, x),
                ja = g(d.plotbordercolor, d.piebordercolor), y = k[ta].numberFormatter, w = c.length,
                E = f(d.plotborderdashed, 0), M = f(d.plotborderdashlen, 5), z = f(d.plotborderdashgap, 4),
                F = f(d.showvalueinlegend, 0), P = f(d.showlabelinlegend, 1), u = f(d.valuebeforelabelinlegend, 0),
                Ta = f(d.showvalueaspercentinlegend, 1), I = f(d.reverseplotorder, 0), U = g(d.legendsepchar, ", "),
                W = k.plotOptions.series.dataLabels.style,
                V = 0, A = [], R, v, S, X, q, Y, C, t, va, O, aa, L, m, N, T, D, K, ha, J, H = -1;
            K = p.centerLabelConfig = {
                label: oa(g(d.defaultcenterlabel, "")),
                font: g(d.centerlabelfont, W.fontFamily),
                fontSize: f(d.centerlabelfontsize, parseInt(W.fontSize, 10)),
                color: da(g(d.centerlabelcolor, d.valuefontcolor, a.inCanvasStyle.color, "555555")),
                alpha: f(d.centerlabelalpha, 100),
                bold: f(d.centerlabelbold, W.fontWeight),
                italic: f(d.centerlabelitalic, W.style),
                bgColor: g(d.centerlabelbgcolor, ""),
                bgAlpha: f(d.centerlabelbgalpha, 100),
                borderColor: g(d.centerlabelbordercolor,
                    W.borderColor),
                borderAlpha: f(d.centerlabelborderalpha, 100),
                borderThickness: f(d.centerlabelborderthickness, W.borderThickness),
                borderRadius: f(d.centerlabelborderradius, W.borderRadius),
                textPadding: f(d.centerlabeltextpadding, W.borderPadding),
                padding: f(d.centerlabelpadding, 2),
                bgOval: f(d.centerlabelbgoval, 0),
                shadow: f(d.showcenterlabelshadow, 0),
                hoverColor: d.centerlabelhovercolor && da(g(d.centerlabelhovercolor)),
                hoverAlpha: f(d.centerlabelhoveralpha),
                toolText: oa(g(d.centerlabeltooltext, ""))
            };
            100 < l && (l = 100);
            0 > l && (l = 0);
            f(d.showlegend, 0) && (k.legend.enabled = !0, k.legend.reversed = !Boolean(f(d.reverselegend, 0)), p.showInLegend = !0);
            for (v = 0; v < w; v += 1) X = c[v], S = y.getCleanValue(X.value, !0), null === S || !h && 0 === S || (A.push(X), V += S);
            0 === V && (A = []);
            p.enableRotation = 1 < A.length ? f(d.enablerotation, 1) : 0;
            p.alphaAnimation = f(d.alphaanimation, 1);
            p.is3D = s;
            p.placeLabelsInside = d.placevaluesinside;
            p.use3DLighting = Q;
            p.pieYScale = f(d.pieyscale, 40);
            1 > p.pieYScale && (p.pieYScale = 1);
            100 <= p.pieYScale && (p.pieYScale = 80);
            p.pieYScale /= 100;
            p.pieSliceDepth =
                f(d.pieslicedepth, 15);
            1 > p.pieSliceDepth && (p.pieSliceDepth = 1);
            p.managedPieSliceDepth = p.pieSliceDepth;
            p.enableMultiSlicing = !!r;
            s && d.showplotborder != Ga && !ca && (p.showBorderEffect = 1);
            for (v = A.length - 1; 0 <= v; --v) {
                X = A[v];
                S = y.getCleanValue(X.value, !0);
                R = oa(g(X.label, X.name, Z));
                w = g(X.color, b.getPlotColor(v));
                Y = g(X.alpha, d.plotfillalpha);
                C = g(X.bordercolor, ja);
                t = g(X.borderalpha, d.plotborderalpha, d.pieborderalpha);
                s && (C || void 0 !== t) && (p.showBorderEffect = 0);
                C = g(C, ma(w, s ? 90 : 25)).split($)[0];
                t = d.showplotborder == ra ?
                    ra : g(t, Y, "80");
                Y = g(Y, Ca);
                h = {opacity: Math.max(Y, t) / 100};
                if (c = Boolean(f(X.issliced, d.issliced, 0))) r || (-1 !== H && (p.data[A.length - H - 1].sliced = !1), H = v), a.preSliced = c;
                ca = (T = f(X.dashed, E)) ? Ea(g(X.dashlen, M), g(X.dashgap, z), e) : "none";
                q = wa(oa(g(X.tooltext, a.tooltext)));
                aa = y.percentValue(S / V * 100);
                L = y.dataLabels(S) || Z;
                O = 1 === f(X.showlabel, na) ? R : Z;
                va = 1 === (m = f(X.showvalue, G)) ? 1 === n ? aa : L : Z;
                N = wa(oa(X.displayvalue));
                va = void 0 !== N && m ? N : va !== Z && O !== Z ? O + gb + va : g(O, va);
                void 0 !== q ? q = Ia(q, [1, 2, 3, 5, 6, 7, 14, 24, 25], {
                    formattedValue: L,
                    label: R,
                    yaxisName: oa(d.yaxisname),
                    xaxisName: oa(d.xaxisname),
                    percentValue: aa,
                    sum: y.dataLabels(V),
                    unformattedSum: V
                }, X, d) : (q = R, m = B ? aa : L, q = q != Z ? q + x + m : m);
                m = P ? R : Z;
                F && (D = Ta ? y.legendPercentValue(S / V * 100) : y.legendValue(S), m = u ? D + (m && U + m) : (m && m + U) + D);
                T = this.pointHoverOptions(X, p, {
                    plotType: "pie",
                    use3DLighting: Q,
                    color: w,
                    alpha: Y,
                    borderWidth: e,
                    borderColor: C,
                    borderAlpha: t,
                    borderDashed: T,
                    borderDashGap: g(X.dashgap, z),
                    borderDashLen: f(X.dashlen, M),
                    radius3D: l,
                    shadow: h
                });
                R = {
                    label: g((ha = X.centerlabel || d.centerlabel) && this.replaceMacros(ha,
                        ["\\$value", "\\$percentValue", "\\$displayValue", "\\$label"], [L, aa, void 0 === N ? "" : N, R]), ""),
                    font: K.font,
                    fontSize: f(X.centerlabelfontsize, K.fontSize),
                    color: da(g(X.centerlabelcolor, K.color)),
                    alpha: f(X.centerlabelalpha, K.alpha),
                    bold: f(X.centerlabelbold, K.bold),
                    italic: f(X.centerlabelitalic, K.italic),
                    bgColor: g(X.centerlabelbgcolor, K.bgColor),
                    bgAlpha: f(X.centerlabelbgalpha, K.bgAlpha),
                    borderColor: g(X.centerlabelbordercolor, K.borderColor),
                    borderAlpha: f(X.centerlabelborderalpha, K.borderAlpha),
                    borderThickness: K.borderThickness,
                    borderRadius: K.borderRadius,
                    textPadding: K.textPadding,
                    padding: K.padding,
                    bgOval: K.bgOval,
                    shadow: K.shadow,
                    hoverColor: (J = g(X.centerlabelhovercolor, K.hoverColor)) && da(J),
                    hoverAlpha: f(X.centerlabelhoveralpha, K.hoverAlpha),
                    toolText: g(X.centerlabeltooltext, "")
                };
                p.data.push({
                    displayValue: va,
                    style: eb(X, {}, d, W, w),
                    categoryLabel: O,
                    showInLegend: m !== Z,
                    y: S,
                    name: m,
                    shadow: h,
                    toolText: q,
                    color: this.getPointColor(w, Y, l),
                    _3dAlpha: Y,
                    borderColor: la(C, t),
                    borderWidth: e,
                    link: wa(X.link),
                    sliced: c,
                    dashStyle: ca,
                    doNotSlice: g(d.enableslicing,
                        Ga) != Ga,
                    hoverEffects: T.enabled && T.options,
                    rolloverProperties: T.enabled && T.rolloverOptions,
                    centerLabelConfig: R
                })
            }
            I && (p.reversePlotOrder = !0, p.data && p.data.reverse());
            p.valueTotal = V;
            k.legend.enabled = d.showlegend === Ga ? !0 : !1;
            p.startAngle = f(d.startingangle, 0);
            k.chart.startingAngle = g(1 < A.length ? d.startingangle : 0, 0);
            return p
        },
        replaceMacros: function (a, p, c) {
            for (var d = p.length || 0, k; d--;) k = new RegExp(p[d], "gi"), a = a.replace(k, c[d]);
            return a
        },
        containsMacro: function (a, p) {
            for (var c = p.length || 0, d; c--;) if (d = new RegExp(p[c],
                    "gi"), d = a.match(d)) return !0;
            return !1
        },
        getPointColor: function (a, p, c) {
            var d, k;
            a = da(a);
            p = Fa(p);
            100 > c && ka ? (d = Math.floor(85 * (100 - .35 * c)) / 100, d = fa(a, d), k = Math.floor(50 * (100 + c)) / 100, a = ma(a, k), p = {
                FCcolor: {
                    color: a + $ + d,
                    alpha: p + $ + p,
                    ratio: c + "," + (100 - c),
                    radialGradient: !0,
                    gradientUnits: "userSpaceOnUse"
                }
            }) : p = {FCcolor: {color: a + $ + a, alpha: p + $ + p, ratio: "0,100"}};
            return p
        },
        configureAxis: function (a, p) {
            var c = 0, d = a[ta], k = p.chart, b = a.xAxis.labels.style, s, ca;
            s = (s = Ja(k.valuebordercolor, Z)) ? la(s, f(k.valueborderalpha, k.valuealpha,
                100)) : Z;
            b = {
                fontFamily: g(k.valuefont, b.fontFamily),
                fontSize: g(k.valuefontsize, parseInt(b.fontSize, 10)) + Sa,
                lineHeight: b.lineHeight,
                color: la(g(k.valuefontcolor, b.color), f(k.valuefontalpha, k.valuealpha, 100)),
                fontWeight: f(k.valuefontbold) ? "bold" : "normal",
                fontStyle: f(k.valuefontitalic) ? "italic" : "normal",
                border: s || k.valuebgcolor ? f(k.valueborderthickness, 1) + "px solid" : void 0,
                borderColor: s,
                borderThickness: f(k.valueborderthickness, 1),
                borderPadding: f(k.valueborderpadding, 2),
                borderRadius: f(k.valueborderradius,
                    0),
                backgroundColor: k.valuebgcolor ? la(k.valuebgcolor, f(k.valuebgalpha, k.valuealpha, 100)) : Z,
                borderDash: f(k.valueborderdashed, 0) ? Ea(f(k.valueborderdashlen, 4), f(k.valueborderdashgap, 2), f(k.valueborderthickness, 1)) : "none"
            };
            a.plotOptions.series.dataLabels.style = b;
            delete d.x;
            delete d[0];
            delete d[1];
            a.chart.plotBorderColor = a.chart.plotBackgroundColor = Ra;
            d = d.pieDATALabels = [];
            if (1 === a.series.length && (ca = a.series[0].data) && 0 < (c = a.series[0].data.length) && a.plotOptions.series.dataLabels.enabled) for (; c--;) ca[c] &&
            void 0 !== wa(ca[c].displayValue) && d.push({text: ca[c].displayValue, style: ca[c].style})
        },
        spaceManager: function (a, p, c, d) {
            var k = a[ta], b = k.is3d, s = this.name, ca = this.colorManager, e = this.smartLabel || k.smartLabel,
                r = f(k.pieDATALabels && k.pieDATALabels.length, 0), Q = 0, l = p.chart,
                h = f(l.managelabeloverflow, 0), B = f(l.slicingdistance),
                na = k.preSliced || l.enableslicing !== ra || l.showlegend === Ga && l.interactivelegend !== ra ? ha(f(B, 20)) : 0,
                G = f(l.pieradius, 0), n = f(l.enablesmartlabels, l.enablesmartlabel, 1), x = n ? f(l.skipoverlaplabels,
                l.skipoverlaplabel, 1) : 0, w = f(l.issmartlineslanted, 1),
                ja = r ? f(l.labeldistance, l.nametbdistance, 5) : na, y = f(l.smartlabelclearance, 5);
            c -= a.chart.marginRight + a.chart.marginLeft;
            var E = d - (a.chart.marginTop + a.chart.marginBottom);
            d = t(E, c);
            var u = g(l.smartlinecolor, ca.getColor("plotFillColor")), M = f(l.smartlinealpha, 100),
                z = f(l.smartlinethickness, .7), F = a.plotOptions.series.dataLabels, ca = F.style,
                P = r ? f(parseInt(ca.lineHeight, 10), 12) : 0, ca = a.series[0] || {}, A = ca.pieYScale,
                Ta = ca.pieSliceDepth;
            d = 0 === G ? .15 * d : G;
            var I = 0, I =
                2 * d, U = f("doughnut2d" === s ? 0 : l.placevaluesinside);
            F.connectorWidth = z;
            F.connectorPadding = f(l.connectorpadding, 5);
            F.connectorColor = la(u, M);
            r && (n && (ja = y), ja += na);
            y = I + 2 * (P + ja);
            E -= this.titleSpaceManager(a, p, c, q(y < E ? E - y : E / 2, parseFloat(a.title.style.lineHeight, 10)));
            l.showlegend === Ga && (g(l.legendposition, $a).toLowerCase() !== cb ? E -= this.placeLegendBlockBottom(a, p, c, E / 2, !0) : c -= this.placeLegendBlockRight(a, p, c / 3, E, !0));
            if (1 !== r) for (; r--;) e.setStyle(k.pieDATALabels[r].style), p = e.getOriSize(k.pieDATALabels[r].text),
                Q = q(Q, p.width);
            0 === G && (b ? (E -= Ta, I = t(c / 2 - Q - na, (E / 2 - P) / A) - ja) : I = t(c / 2 - Q - na, E / 2 - P) - ja, I >= d ? d = I : B || (na = ja = q(t(ja - (d - I), na), 10)));
            b && (r = E - 2 * (d * A + P), Ta > r && (ca.managedPieSliceDepth = Ta - r));
            a.plotOptions.pie3d.slicedOffset = a.plotOptions.pie.slicedOffset = na;
            a.plotOptions.pie3d.size = a.plotOptions.pie.size = 2 * d;
            a.plotOptions.series.dataLabels.distance = ja;
            a.plotOptions.series.dataLabels.isSmartLineSlanted = w;
            a.plotOptions.series.dataLabels.enableSmartLabels = n;
            a.plotOptions.series.dataLabels.skipOverlapLabels = x;
            a.plotOptions.series.dataLabels.manageLabelOverflow = h;
            a.plotOptions.series.dataLabels.placeLabelsInside = U;
            if ("doughnut2d" === s || "doughnut3d" === s) if (s = f(l.doughnutradius, 0), r = (r = f(l.use3dlighting, 1)) ? f(l.radius3d, l["3dradius"], 50) : 100, 100 < r && (r = 100), 0 > r && (r = 0), l = 0 === s || s >= d ? d / 2 : s, a.plotOptions.pie3d.innerSize = a.plotOptions.pie.innerSize = 2 * l, 0 < r && ka && (l = parseInt(l / d * 100, 10), s = (100 - l) / 2, r = parseInt(s * r / 100, 10), l = l + $ + r + $ + 2 * (s - r) + $ + r, a.series[0] && a.series[0].data)) for (h = a.series[0].data, a = 0, r = h.length; a <
            r; a += 1) s = h[a], s.color.FCcolor && (s.color.FCcolor.ratio = l, s.rolloverProperties.color && (s.rolloverProperties.color.FCcolor.ratio = l))
        },
        creditLabel: sa,
        eiMethods: {
            isPlotItemSliced: function (a) {
                var p = this.jsVars.hcObj, c, d, k;
                return p && p.datasets && p.datasets[0] && (c = p.datasets[0].data) && (k = c.length) && c[a = k - a - 1] && (d = c[a].plot) && d.sliced
            }, slicePlotItem: function (a, p) {
                var c = this.jsVars.hcObj, d, k, b, s;
                return c && c.datasets && (d = c.datasets[0]) && (k = d.data) && (s = k.length) && k[a = d.reversePlotOrder ? a : s - a - 1] && (b = k[a].plot) &&
                    ((!!p !== b.sliced || void 0 === p) && c.plotGraphicClick.call(b) || b.sliced)
            }, centerLabel: function (a, p) {
                var c = this.jsVars.hcObj, d = c.options, k = d.series[0], d = d.plotOptions.pie.innerSize,
                    b = c.canvasLeft + .5 * c.canvasWidth, s = c.canvasTop + .5 * c.canvasHeight,
                    ca = k.centerLabelConfig, e;
                if ("object" !== typeof p) p = ca; else for (e in ca) void 0 === p[e] && (p[e] = ca[e]);
                p.label = a;
                k.centerLabelConfig = p;
                d && c.drawDoughnutCenterLabel(a || "", b, s, d, d, p, !0)
            }, startingAngle: function (a, p) {
                var c = this.jsVars.hcObj, d = c.datasets[0].plot, k = "pie" ===
                    c.options.chart.defaultSeriesType, b,
                    s = (b = c.datasets[0].startAngle) * (k ? -O : 1) + (0 > (k ? -1 : 1) * b ? 360 : 0);
                if (!isNaN(a)) {
                    if (d.singletonCase || d.isRotating) return;
                    a += p ? s : 0;
                    k ? ((k = c.options.series[0]).startAngle = -a * N, c.rotate(d, k)) : c.rotate(a);
                    s = a
                }
                return u(100 * ((s %= 360) + (0 > s ? 360 : 0))) / 100
            }
        }
    }, ya);
    n.pie2d.eiMethods.togglePieSlice = n.pie2d.eiMethods.sliceDataItem = n.pie2d.eiMethods.slicePlotItem;
    n.pie2d.eiMethods.enableSlicingMovement = n.pie2d.eiMethods.enablelink = function () {
        ea.raiseWarning(this, "1301081430", "run", "JSRenderer~enablelink()",
            "Method deprecated.")
    };
    n("pie3d", {
        friendlyName: "3D Pie Chart",
        defaultSeriesType: "pie3d",
        rendererId: "pie3d",
        creditLabel: sa,
        fireGroupEvent: !0,
        getPointColor: function (a) {
            return a
        },
        defaultPlotShadow: 0
    }, n.pie2d);
    n("doughnut2d", {
        friendlyName: "Doughnut Chart", getPointColor: function (a, p, c) {
            var d;
            a = da(a);
            p = Fa(p);
            100 > c && ka ? (d = fa(a, L(100 * (85 - .2 * (100 - c))) / 100), a = ma(a, L(100 * (100 - .5 * c)) / 100), p = {
                FCcolor: {
                    color: d + "," + a + "," + a + "," + d,
                    alpha: p + "," + p + "," + p + "," + p,
                    radialGradient: !0,
                    gradientUnits: "userSpaceOnUse",
                    r: c
                }
            }) : p =
                {FCcolor: {color: a + "," + a, alpha: p + "," + p, ratio: "0,100"}};
            return p
        }
    }, n.pie2d);
    n("doughnut3d", {
        friendlyName: "3D Doughnut Chart",
        defaultSeriesType: "pie3d",
        rendererId: "pie3d",
        fireGroupEvent: !0,
        getPointColor: n.pie3d,
        defaultPlotShadow: 0
    }, n.doughnut2d);
    n("pareto2d", {
        standaloneInit: !0, friendlyName: "Pareto Chart", point: function (a, p, c, d, k) {
            a = c.length;
            var b = 0, s = 0, e = {}, h = this.colorManager, r = /3d$/.test(k.chart.defaultSeriesType), Q = this.isBar,
                l = g(360 - d.plotfillangle, 90),
                ua = g(d.showplotborder, r ? ra : Ga) === Ga ? r ? 1 : f(d.plotborderthickness,
                    1) : 0, B = k.chart.useRoundEdges, na = g(d.tooltipsepchar, ", "),
                G = g(d.plotbordercolor, h.getColor("plotBorderColor")).split($)[0],
                n = d.showplotborder == ra ? ra : g(d.plotborderalpha, d.plotfillalpha, Ca), x = k.xAxis,
                E = f(d.showcumulativeline, 1), ja = k[ta], y = ja.axisGridManager, w = ja.x, u = d.showtooltip != ra,
                M = [], z = f(d.use3dlighting, 1), F = k[ta].numberFormatter, P = f(d.showlinevalues, d.showvalues),
                A = f(d.plotborderdashed, 0), q, I = f(d.plotborderdashlen, 5), U = f(d.plotborderdashgap, 4),
                W = oa(d.xaxisname), V = oa(d.yaxisname), C = ja.numberFormatter,
                R = p, v, S, X, t, Y, K, m, O, aa, L, N, T, D, ha, H, J, fa, ba, la, qa, ma, ia, ga, ka,
                n = r ? d.showplotborder ? n : ra : n, G = r ? g(d.plotbordercolor, "#FFFFFF") : G;
            X = f(d.useplotgradientcolor, 1) ? Ua(d.plotgradientcolor, h.getColor("plotGradientColor")) : Z;
            for (H = S = 0; S < a; S += 1) qa = c[S], c[S].vline ? y.addVline(x, qa, H, k) : (v = F.getCleanValue(qa.value, !0), null !== v && (s += qa.value = v, M.push(qa), H += 1));
            a = M.length;
            M.sort(function (a, c) {
                return c.value - a.value
            });
            E && 0 < s ? (L = f(d.linedashed, 0), ma = da(g(d.linecolor, h.getColor("plotBorderColor"))), e = g(d.linealpha,
                100), N = f(d.linedashlen, 5), t = f(d.linedashgap, 4), S = f(d.linethickness, 2), D = {opacity: e / 100}, la = g(d.valueposition, "auto"), ha = f(d.drawanchors, d.showanchors), void 0 === ha && (ha = e != ra), fa = f(d.anchorborderthickness, 1), ba = f(d.anchorsides, 0), q = f(d.anchorradius, 3), J = da(g(d.anchorbordercolor, ma)), v = da(g(d.anchorbgcolor, h.getColor("anchorBgColor"))), H = Fa(g(d.anchoralpha, Ca)), c = Fa(g(d.anchorbgalpha, H)) * H / 100, L = L ? Ea(N, t, S) : "none", t = Boolean(f(qa.anchorshadow, d.anchorshadow, 0)), N = this.pointHoverOptions(qa, p, {
                plotType: "anchor",
                anchorBgColor: v,
                anchorAlpha: H,
                anchorBgAlpha: c,
                anchorAngle: g(d.anchorstartangle, 90),
                anchorBorderThickness: fa,
                anchorBorderColor: J,
                anchorBorderAlpha: H,
                anchorSides: ba,
                anchorRadius: q,
                shadow: T
            }), e = {
                yAxis: 1,
                data: [],
                type: "line",
                color: {FCcolor: {color: ma, alpha: e}},
                lineWidth: S,
                marker: {
                    enabled: ha,
                    shadow: t && 1 <= q ? {opacity: H / 100} : !1,
                    fillColor: {FCcolor: {color: v, alpha: c}},
                    lineColor: {FCcolor: {color: J, alpha: H}},
                    lineWidth: fa,
                    radius: q,
                    symbol: Ha(ba),
                    startAngle: g(d.anchorstartangle, 90)
                }
            }, R = [R, e], ja[1] || (ja[1] = {}), ja[1].stacking100Percent =
                !0) : ("1" !== d.showsecondarylimits && (d.showsecondarylimits = "0"), "1" !== d.showdivlinesecondaryvalue && (d.showdivlinesecondaryvalue = "0"));
            ja[1] || (ja[1] = {});
            ja[1].stacking100Percent = !0;
            for (S = 0; S < a; S += 1) qa = M[S], T = f(qa.showlabel, d.showlabels, 1), c = oa(T ? Ja(qa.label, qa.name) : Z), m = g(qa.color, h.getPlotColor()), y.addXaxisCat(x, S, S, c, qa, {}, d, m), b += v = qa.value, t = f(qa.dashed, A), Y = g(qa.dashgap, U), K = g(qa.dashlen, I), O = g(qa.alpha, d.plotfillalpha, Ca), aa = g(qa.ratio, d.plotfillratio), T = {opacity: O / 100}, ia = g(qa.alpha, n) + Z, ma =
                Ba(m + $ + X.replace(/,+?$/, ""), O, aa, l, B, G + Z, ia + Z, Q, r), q = t ? Ea(K, Y, ua) : "none", H = b / s * 100, fa = F.percentValue(H), J = null === v ? v : C.dataLabels(v), ba = wa(oa(qa.displayvalue)), ba = f(qa.showvalue, ja.showValues) ? void 0 !== ba ? ba : J : Z, ja.showTooltip ? void 0 !== (ha = wa(oa(g(qa.tooltext, ja.tooltext)))) ? (ga = {
                formattedValue: J,
                label: c,
                yaxisName: V,
                xaxisName: W,
                cumulativeValue: b,
                cumulativeDataValue: C.dataLabels(b),
                cumulativePercentValue: fa,
                sum: C.dataLabels(s),
                unformattedSum: s
            }, ka = [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25], ha = Ia(ha, ka, ga, qa,
                d)) : ha = null === J ? !1 : c !== Z ? c + ja.tooltipSepChar + J : J : ha = Z, Y = this.pointHoverOptions(qa, p, {
                plotType: "column",
                is3d: r,
                isBar: Q,
                use3DLighting: z,
                isRoundEdged: B,
                color: m,
                gradientColor: X,
                alpha: O,
                ratio: aa,
                angle: l,
                borderWidth: ua,
                borderColor: G,
                borderAlpha: ia,
                borderDashed: t,
                borderDashGap: Y,
                borderDashLen: K,
                shadow: T
            }), t = g(qa.link), p.data.push({
                link: t,
                toolText: ha,
                displayValue: ba,
                categoryLabel: c,
                y: v,
                shadow: T,
                color: ma[0],
                borderColor: ma[1],
                borderWidth: ua,
                use3DLighting: z,
                dashStyle: q,
                tooltipConstraint: this.tooltipConstraint,
                hoverEffects: Y.enabled && Y.options,
                rolloverProperties: Y.enabled && Y.rolloverOptions
            }), this.pointValueWatcher(k, v), E && (v = wa(oa(g(qa.cumulativeplottooltext, d.cumulativeplottooltext))), T = 1 == P ? fa : 0 === P || ba === Z ? Z : fa, ha = u ? void 0 !== v ? Ia(v, ka || [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25], ga || {
                formattedValue: J,
                label: c,
                yaxisName: V,
                xaxisName: W,
                cumulativeValue: b,
                cumulativeDataValue: C.dataLabels(b),
                cumulativePercentValue: fa,
                sum: C.dataLabels(s),
                unformattedSum: s
            }, qa, d) : (c !== Z ? c + na : Z) + fa : Z, e.data.push({
                shadow: D,
                color: e.color,
                marker: e.marker,
                y: H,
                toolText: ha,
                displayValue: T,
                valuePosition: la,
                categoryLabel: c,
                link: t,
                dashStyle: L,
                hoverEffects: N.enabled && N.options,
                rolloverProperties: N.enabled && N.rolloverOptions
            }));
            w.catCount = a;
            return R
        }, defaultSeriesType: "column", isDual: !0, creditLabel: sa, rendererId: "cartesian"
    }, ya);
    n("pareto3d", {
        friendlyName: "3D Pareto Chart",
        defaultSeriesType: "column3d",
        fireGroupEvent: !0,
        defaultPlotShadow: 1,
        is3D: !0
    }, n.pareto2d);
    n("mscolumn2d", {
            standaloneInit: !0,
            friendlyName: "Multi-series Column Chart",
            creditLabel: sa,
            rendererId: "cartesian"
        },
        n.mscolumn2dbase);
    n("mscolumn3d", {
        defaultSeriesType: "column3d",
        friendlyName: "Multi-series 3D Column Chart",
        defaultPlotShadow: 1,
        fireGroupEvent: !0,
        is3D: !0,
        defaultZeroPlaneHighlighted: !1
    }, n.mscolumn2d);
    n("msbar2d", {
        friendlyName: "Multi-series Bar Chart",
        isBar: !0,
        defaultSeriesType: "bar",
        spaceManager: n.barbase
    }, n.mscolumn2d);
    n("msbar3d", {
        defaultSeriesType: "bar3d",
        friendlyName: "Multi-series 3D Bar Chart",
        fireGroupEvent: !0,
        defaultPlotShadow: 1,
        is3D: !0,
        defaultZeroPlaneHighlighted: !1
    }, n.msbar2d);
    n("msline",
        {
            standaloneInit: !0,
            friendlyName: "Multi-series Line Chart",
            creditLabel: sa,
            rendererId: "cartesian"
        }, n.mslinebase);
    n("msarea", {
        standaloneInit: !0,
        friendlyName: "Multi-series Area Chart",
        creditLabel: sa,
        rendererId: "cartesian"
    }, n.msareabase);
    n("stackedcolumn2d", {friendlyName: "Stacked Column Chart", isStacked: !0}, n.mscolumn2d);
    n("stackedcolumn3d", {friendlyName: "3D Stacked Column Chart", isStacked: !0}, n.mscolumn3d);
    n("stackedbar2d", {friendlyName: "Stacked Bar Chart", isStacked: !0}, n.msbar2d);
    n("stackedbar3d", {
        friendlyName: "3D Stacked Bar Chart",
        isStacked: !0
    }, n.msbar3d);
    n("stackedarea2d", {friendlyName: "Stacked Area Chart", isStacked: !0, areaAlpha: 100, showSum: 0}, n.msarea);
    n("marimekko", {
        friendlyName: "Marimekko Chart",
        isValueAbs: !0,
        distributedColumns: !0,
        isStacked: !0,
        xAxisMinMaxSetter: Oa,
        postSeriesAddition: function (a, p) {
            var c = a[ta], d = 0, k = a.xAxis, b = 100 / c.marimekkoTotal, s = [], e = a.series, h = 0,
                r = xa({}, a.plotOptions.series.dataLabels.style), Q = parseInt(r.fontSize, 10),
                l = f(p.chart.plotborderthickness, 1), ua = a.chart.rotateValues,
                B = f(p.chart.rotatexaxispercentvalues,
                    0), na = -.5 * l - (l % 2 + (B ? 1 : 0) + !a.chart.plotBorderWidth), G = B ? Q / 2 * 1.2 : 0,
                n = ua ? 270 : 0, x = c[0], E = x.stacking100Percent, ja = !E, y = c.inCanvasStyle,
                w = this.numberFormatter, g = p.categories && p.categories[0] && p.categories[0].category || [], M = 0,
                z = [], F, P, q, A, I, U, W, V, t, R, l = [];
            c.isXYPlot = !0;
            c.distributedColumns = !0;
            k.min = 0;
            k.max = 100;
            k.labels.enabled = !1;
            k.gridLineWidth = 0;
            k.alternateGridColor = Ra;
            F = x.stack;
            p.chart.interactivelegend = "0";
            x = 0;
            for (P = a.xAxis.plotLines.length; x < P; x += 1) q = k.plotLines[x], q.isGrid && (q.isCat = !0, s[q.value] =
                q, q._hideLabel = !0);
            for (x = P = 0; x < g.length; x += 1) g[x].vline || (M += z[P] = w.getCleanValue(g[x].widthpercent || 0), P += 1);
            q = F.floatedcolumn && F.floatedcolumn[0] || [];
            if (100 === M && (q && q.length) !== P) for (; P--;) q[P] || (q[P] = {p: null});
            M = u(M);
            if (q) for (I = 0, P = q.length; I < P;) {
                R = q[I];
                d += A = R && R.p || 0;
                W = 100 === M ? z[I] : A * b;
                U = h + W / 2;
                V = h + W;
                l.push(V);
                for (x = 0; x < e.length; x += 1) if (a.series[x].visible = !0, g = a.series[x].data[I], g._FCX = h, g._FCW = W, t = w.percentValue(g.y / A * 100), g.toolText = Ia(g.toolText, [14, 24, 25, 111, 112], {
                        xAxisPercentValue: w.percentValue(W),
                        percentValue: t, sum: w.dataLabels(A), unformattedSum: A
                    }), E) {
                    if (g.y || 0 === g.y) F = g.y / A * 100, g.y = F, g.showPercentValues && (g.displayValue = t);
                    if (g.previousY || 0 === g.previousY) g.previousY = g.previousY / A * 100
                }
                c.showStackTotal && a.xAxis.plotLines.push({
                    value: U,
                    width: 0,
                    isVline: ja,
                    isTrend: !ja,
                    _isStackSum: 1,
                    zIndex: 4,
                    label: {
                        align: Wa,
                        textAlign: Wa,
                        rotation: n,
                        style: r,
                        verticalAlign: bb,
                        offsetScale: ja ? 0 > A ? R.n : R.p : void 0,
                        offsetScaleIndex: 0,
                        y: 0 > A ? 270 === ua ? 4 : Q : -4,
                        x: 0,
                        text: w.yAxis(Na(A, 10))
                    }
                });
                s[I] && (s[I].value = U, s[I]._weight = W,
                    s[I]._hideLabel = !1);
                I += 1;
                c.showXAxisPercentValues && I < P && a.xAxis.plotLines.push({
                    value: V,
                    width: 0,
                    isVine: !0,
                    label: {
                        align: Wa,
                        textAlign: B ? db : Wa,
                        rotation: B ? 270 : 0,
                        backgroundColor: "#ffffff",
                        backgroundOpacity: 1,
                        borderWidth: "1px",
                        borderType: "solid",
                        borderColor: y.color,
                        style: {
                            color: y.color,
                            fontSize: y.fontSize,
                            fontFamily: y.fontFamily,
                            lineHeight: y.lineHeight
                        },
                        verticalAlign: $a,
                        y: na,
                        x: G,
                        text: this.numberFormatter.percentValue(V)
                    },
                    zIndex: 5
                });
                h = V
            }
            I = 0;
            for (P = s.length; I < P; I += 1) s[I] && s[I]._hideLabel && (s[I].value = null);
            x = 0;
            for (P = a.xAxis.plotLines.length; x < P; x += 1) if (q = k.plotLines[x], q.isVline && !q._isStackSum && (c = q.value)) c -= .5, d = l[L(c)], b = l[C(c)], q.value = d + (b - d) * (c - L(c))
        },
        defaultSeriesType: "floatedcolumn"
    }, n.stackedcolumn2d);
    n("msstackedcolumn2d", {
        friendlyName: "Multi-series Stacked Column Chart", series: function (a, p, c) {
            var d, b, e, s, ca = p[ta], h = 0, r, Q;
            r = [];
            var l;
            p.legend.enabled = Boolean(f(a.chart.showlegend, 1));
            if (a.dataset && 0 < a.dataset.length) {
                this.categoryAdder(a, p);
                d = 0;
                for (b = a.dataset.length; d < b; d += 1) if (l = a.dataset[d].dataset) for (e =
                                                                                                 0, s = l.length; e < s; e += 1, h += 1) r = {
                    hoverEffects: this.parseSeriesHoverOptions(a, p, l[e], c),
                    visible: !f(l[e].initiallyhidden, 0),
                    data: [],
                    numColumns: b,
                    columnPosition: d
                }, Q = Math.min(ca.oriCatTmp.length, l[e].data && l[e].data.length), r = this.point(c, r, l[e], a.chart, p, Q, h, d), p.series.push(r);
                if (this.isDual && a.lineset && 0 < a.lineset.length) for (e = 0, s = a.lineset.length; e < s; e += 1, h += 1) d = a.lineset[e], r = {
                    hoverEffects: this.parseSeriesHoverOptions(a, p, d, c),
                    visible: !f(d.initiallyhidden, 0),
                    data: [],
                    yAxis: 1,
                    type: "line"
                }, Q = Math.min(ca.oriCatTmp.length,
                    d.data && d.data.length), p.series.push(n.msline.point.call(this, "msline", r, d, a.chart, p, Q, h));
                this.configureAxis(p, a);
                a.trendlines && Xa(a.trendlines, p.yAxis, p[ta], this.isDual, this.isBar)
            }
        }, postSpaceManager: function (a, p, c) {
            var d = a[ta], b, e, s;
            n.base.postSpaceManager.call(this);
            if (this.isStacked && d.showStackTotal && (b = a.chart, a = (p = a.xAxis) && p.plotLines, b = c - b.marginLeft - b.marginRight, c = d.plotSpacePercent, d = d[0].stack, d = d.column && d.column.length, e = (1 - 2 * c) / d, p = b / (p.max - p.min), 50 < p * e && .1 == c)) for (p = 50 / p, c = a && a.length,
                                                                                                                                                                                                                                                                                                    d = -((d - 1) / 2) * p, s = 0; s < c; s += 1) e = a[s], e._isStackSum && (b = e._catPosition + (d + p * e._stackIndex), e.value = b)
        }
    }, n.stackedcolumn2d);
    n("mscombi2d", {
        friendlyName: "Multi-series Combination Chart",
        standaloneInit: !0,
        creditLabel: sa,
        rendererId: "cartesian"
    }, n.mscombibase);
    n("mscombi3d", {
        friendlyName: "Multi-series 3D Combination Chart", series: n.mscombi2d.series, eiMethods: function (a) {
            var p = {};
            Aa(a.split(","), function (a) {
                p[a] = function () {
                    ea.raiseWarning(this, "1301081430", "run", "JSRenderer~" + a + "()", "Method not applicable.")
                }
            });
            return p
        }("view2D,view3D,resetView,rotateView,getViewAngles,fitToStage")
    }, n.mscolumn3d);
    n("mscolumnline3d", {friendlyName: "Multi-series Column and Line Chart"}, n.mscombi3d);
    n("stackedcolumn2dline", {
        friendlyName: "Stacked Column and Line Chart",
        isStacked: !0,
        stack100percent: 0
    }, n.mscombi2d);
    n("stackedcolumn3dline", {
        friendlyName: "Stacked 3D Column and Line Chart",
        isStacked: !0,
        stack100percent: 0
    }, n.mscombi3d);
    n("mscombidy2d", {
            friendlyName: "Multi-series Dual Y-Axis Combination Chart",
            isDual: !0,
            secondarySeriesType: void 0
        },
        n.mscombi2d);
    n("mscolumn3dlinedy", {
        friendlyName: "Multi-series 3D Column and Line Chart",
        isDual: !0,
        secondarySeriesType: "line"
    }, n.mscolumnline3d);
    n("stackedcolumn3dlinedy", {
        friendlyName: "Stacked 3D Column and Line Chart",
        isDual: !0,
        secondarySeriesType: "line"
    }, n.stackedcolumn3dline);
    n("msstackedcolumn2dlinedy", {
        friendlyName: "Multi-series Dual Y-Axis Stacked Column and Line Chart",
        isDual: !0,
        stack100percent: 0,
        secondarySeriesType: "line"
    }, n.msstackedcolumn2d);
    n("scrollcolumn2d", {
        friendlyName: "Scrollable Multi-series Column Chart",
        postSeriesAddition: n.scrollbase.postSeriesAddition,
        tooltipConstraint: "plot",
        canvasborderthickness: 1,
        avgScrollPointWidth: 40
    }, n.mscolumn2d);
    n("scrollline2d", {
        friendlyName: "Scrollable Multi-series Line Chart",
        postSeriesAddition: n.scrollbase.postSeriesAddition,
        tooltipConstraint: "plot",
        canvasborderthickness: 1,
        avgScrollPointWidth: 75
    }, n.msline);
    n("scrollarea2d", {
        friendlyName: "Scrollable Multi-series Area Chart",
        postSeriesAddition: n.scrollbase.postSeriesAddition,
        tooltipConstraint: "plot",
        canvasborderthickness: 1,
        avgScrollPointWidth: 75
    }, n.msarea);
    n("scrollstackedcolumn2d", {
        friendlyName: "Scrollable Stacked Column Chart",
        postSeriesAddition: function (a, p, c, d) {
            n.base.postSeriesAddition.call(this, a, p, c, d);
            n.scrollbase.postSeriesAddition.call(this, a, p, c, d)
        },
        canvasborderthickness: 1,
        tooltipConstraint: "plot",
        avgScrollPointWidth: 75
    }, n.stackedcolumn2d);
    n("scrollcombi2d", {
            friendlyName: "Scrollable Combination Chart",
            postSeriesAddition: n.scrollbase.postSeriesAddition,
            tooltipConstraint: "plot",
            canvasborderthickness: 1,
            avgScrollPointWidth: 40
        },
        n.mscombi2d);
    n("scrollcombidy2d", {
        friendlyName: "Scrollable Dual Y-Axis Combination Chart",
        postSeriesAddition: n.scrollbase.postSeriesAddition,
        tooltipConstraint: "plot",
        canvasborderthickness: 1,
        avgScrollPointWidth: 40
    }, n.mscombidy2d);
    n("scatter", {
        friendlyName: "Scatter Chart",
        isXY: !0,
        standaloneInit: !0,
        defaultSeriesType: "scatter",
        defaultZeroPlaneHighlighted: !1,
        creditLabel: sa
    }, n.scatterbase);
    n("bubble", {
        friendlyName: "Bubble Chart",
        standaloneInit: !0,
        standaloneInut: !0,
        defaultSeriesType: "bubble",
        rendererId: "bubble",
        point: function (a, p, c, d, b) {
            a = f(d.ignoreemptydatasets, 0);
            var e = !1, s = this.colorManager, ca, h, r, Q, l, ua, B, na, G, n, x, E, w, y, q, A,
                M = f(c.showvalues, b[ta].showValues);
            ca = f(d.bubblescale, 1);
            var z = g(d.negativecolor, "FF0000"), F = b.plotOptions.bubble, P = this.numberFormatter,
                u = p._showRegression = f(c.showregressionline, d.showregressionline, 0), t, I, U, W;
            p.name = wa(c.seriesname);
            r = Boolean(f(c.drawanchors, c.showanchors, d.drawanchors, 1));
            na = g(c.plotfillalpha, c.bubblefillalpha, d.plotfillalpha, Ca);
            G = f(c.showplotborder, d.showplotborder,
                1);
            n = da(g(c.plotbordercolor, d.plotbordercolor, "666666"));
            x = g(c.plotborderthickness, d.plotborderthickness, 1);
            E = g(c.plotborderalpha, d.plotborderalpha, "95");
            G = 1 === G ? x : 0;
            s = g(c.color, c.plotfillcolor, d.plotfillcolor, s.getPlotColor());
            p.marker = {
                enabled: r,
                fillColor: this.getPointColor(s, Ca),
                lineColor: la(n, G ? E : 0),
                lineWidth: G,
                symbol: "circle"
            };
            if (x = c.data) {
                A = x.length;
                F.bubbleScale = ca;
                if (0 === f(c.includeinlegend) || void 0 === p.name) p.showInLegend = !1;
                u && (p.events = {hide: this.hideRLine, show: this.showRLine}, t = {
                    sumX: 0,
                    sumY: 0, sumXY: 0, sumXsqure: 0, sumYsqure: 0, xValues: [], yValues: []
                }, I = f(c.showyonx, d.showyonx, 1), U = da(g(c.regressionlinecolor, d.regressionlinecolor, s)), W = f(c.regressionlinethickness, d.regressionlinethickness, 1), ca = Fa(f(c.regressionlinealpha, d.regressionlinealpha, 100)), U = la(U, ca));
                for (h = 0; h < A; h += 1) (Q = x[h]) ? (ca = P.getCleanValue(Q.y), w = P.getCleanValue(Q.x), y = P.getCleanValue(Q.z, !0), null === ca ? p.data.push({
                    y: null,
                    x: w
                }) : (e = !0, B = 0 !== f(d.use3dlighting, Q.is3d, c.is3d, d.is3d), l = da(g(Q.color, 0 > Q.z ? z : s)), ua = g(Q.alpha,
                    na), q = this.getPointStub(Q, ca, w, b, c, M), l = B ? this.getPointColor(l, ua) : {
                    FCcolor: {
                        color: l,
                        alpha: ua
                    }
                }, null !== y && (F.zMax = F.zMax > y ? F.zMax : y, F.zMin = F.zMin < y ? F.zMin : y), Q = this.pointHoverOptions(Q, p, {
                    plotType: "bubble",
                    is3d: B,
                    seriesAnchorSymbol: "circle",
                    color: l,
                    negativeColor: z,
                    alpha: ua,
                    borderWidth: G,
                    borderColor: n,
                    borderAlpha: E,
                    shadow: !1
                }), p.data.push({
                    y: ca,
                    x: w,
                    z: y,
                    displayValue: q.displayValue,
                    toolText: q.toolText,
                    link: q.link,
                    hoverEffects: Q.enabled && Q.options,
                    rolloverProperties: Q.enabled && Q.rolloverOptions,
                    marker: {
                        enabled: r,
                        fillColor: l, lineColor: {FCcolor: {color: n, alpha: E}}, lineWidth: G, symbol: "circle"
                    }
                }), this.pointValueWatcher(b, ca, w, u && t))) : p.data.push({y: null});
                u && (c = {
                    type: "line",
                    color: U,
                    showInLegend: !1,
                    lineWidth: W,
                    enableMouseTracking: !1,
                    marker: {enabled: !1},
                    data: this.getRegressionLineSeries(t, I, A),
                    zIndex: 0
                }, p = [p, c])
            }
            a && !e && (p.showInLegend = !1);
            return p
        },
        getPointStub: function (a, p, c, d, b, e) {
            var s = this.dataObj.chart;
            d = d[ta];
            p = null === p ? p : d.numberFormatter.dataLabels(p);
            var ca, h = d.tooltipSepChar, r = wa(oa(g(a.tooltext, b.plottooltext,
                d.tooltext)));
            d.showTooltip ? void 0 !== r ? b = Ia(r, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 118], {
                yDataValue: p,
                xDataValue: d.numberFormatter.xAxis(c),
                yaxisName: oa(s.yaxisname),
                xaxisName: oa(s.xaxisname),
                zDataValue: d.numberFormatter.dataLabels(a.z)
            }, a, s, b) : null === p ? b = !1 : (d.seriesNameInToolTip && (ca = g(b && b.seriesname)), b = ca ? ca + h : Z, b += c ? d.numberFormatter.xAxis(c) + h : Z, b = b + p + (a.z ? h + d.numberFormatter.dataLabels(a.z) : Z)) : b = Z;
            c = f(a.showvalue, e, d.showValues) ? void 0 !== g(a.displayvalue, a.name, a.label) ? oa(g(a.displayvalue, a.name, a.label)) :
                p : Z;
            a = wa(a.link);
            return {displayValue: c, toolText: b, link: a}
        }
    }, n.scatter);
    n("ssgrid", {
        friendlyName: "Grid Component",
        standaloneInit: !0,
        defaultSeriesType: "ssgrid",
        rendererId: "ssgrid",
        chart: function (a, b) {
            var c = this.containerElement, d = xa({}, this.dataObj), k = d.chart || (d.chart = d.graph || {}),
                e = this.chartInstance, s = 0, h = [], B = d.data, r = B && B.length, Q = this.smartLabel,
                l = this.numberFormatter, ua = c.offsetHeight, E = c.offsetWidth, na = this.colorManager, G, w, x, q,
                ja, y, A, u, M, z, F, P, t, C, I, U, W, V, m, R, v, S, X, K, Y, T = 0;
            w = 0;
            var c = {
                    _FCconf: {
                        0: {stack: {}},
                        1: {stack: {}},
                        x: {stack: {}},
                        noWrap: !1,
                        marginLeftExtraSpace: 0,
                        marginRightExtraSpace: 0,
                        marginBottomExtraSpace: 0,
                        marginTopExtraSpace: 0,
                        marimekkoTotal: 0
                    },
                    chart: {
                        ignoreHiddenSeries: !1,
                        events: {},
                        spacingTop: 0,
                        spacingRight: 0,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        borderRadius: 0,
                        borderColor: "#000000",
                        borderWidth: 1,
                        defaultSeriesType: "ssgrid",
                        textDirection: "1" === k.hasrtltext ? "rtl" : "",
                        style: {
                            fontFamily: g(k.basefont, "Verdana,sans"),
                            fontSize: Va(k.basefontsize, 20) + Sa,
                            color: g(k.basefontcolor,
                                na.getColor("baseFontColor")).replace(/^#?([a-f0-9]+)/ig, "#$1")
                        },
                        plotBackgroundColor: Ra
                    },
                    labels: {smartLabel: Q},
                    colors: "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "),
                    credits: {href: D.CREDIT_HREF, text: D.CREDIT_STRING, enabled: sa},
                    legend: {enabled: !1},
                    series: [],
                    subtitle: {text: Z},
                    title: {text: Z},
                    tooltip: {enabled: !1},
                    exporting: {buttons: {exportButton: {}, printButton: {enabled: !1}}}
                },
                N = c[ta], O = G = w = T = 0, L = s = C = 0;
            Y = e.jsVars.cfgStore;
            e = c.chart;
            ja = e.toolbar = {button: {}};
            y = ja.button;
            delete d.graph;
            ba(c.chart.style);
            e.events.click = this.linkClickFN;
            y.scale = f(k.toolbarbuttonscale, 1.15);
            y.width = f(k.toolbarbuttonwidth, 15);
            y.height = f(k.toolbarbuttonheight, 15);
            y.radius = f(k.toolbarbuttonradius, 2);
            y.spacing = f(k.toolbarbuttonspacing, 5);
            y.fill = la(g(k.toolbarbuttoncolor, "ffffff"));
            y.labelFill = la(g(k.toolbarlabelcolor, "cccccc"));
            y.symbolFill = la(g(k.toolbarsymbolcolor, "ffffff"));
            y.hoverFill = la(g(k.toolbarbuttonhovercolor,
                "ffffff"));
            y.stroke = la(g(k.toolbarbuttonbordercolor, "bbbbbb"));
            y.symbolStroke = la(g(k.toolbarsymbolbordercolor, "9a9a9a"));
            y.strokeWidth = f(k.toolbarbuttonborderthickness, 1);
            y.symbolStrokeWidth = f(k.toolbarsymbolborderthickness, 1);
            d = y.symbolPadding = f(k.toolbarsymbolpadding, 5);
            y.symbolHPadding = f(k.toolbarsymbolhpadding, d);
            y.symbolVPadding = f(k.toolbarsymbolvpadding, d);
            y = ja.position = g(k.toolbarposition, "tr").toLowerCase();
            switch (y) {
                case "tr":
                case "tl":
                case "br":
                case "bl":
                    break;
                default:
                    y = "tr"
            }
            d = ja.hAlign =
                "left" === (Z + k.toolbarhalign).toLowerCase() ? "l" : y.charAt(1);
            y = ja.vAlign = "bottom" === (Z + k.toolbarvalign).toLowerCase() ? "b" : y.charAt(0);
            ja.hDirection = f(k.toolbarhdirection, "r" === d ? -1 : 1);
            ja.vDirection = f(k.toolbarvdirection, "b" === y ? -1 : 1);
            ja.vMargin = f(k.toolbarvmargin, 6);
            ja.hMargin = f(k.toolbarhmargin, 10);
            ja.x = f(k.toolbarx, "l" === d ? 0 : a);
            ja.y = f(k.toolbary, "t" === y ? 0 : b);
            void 0 !== g(k.clickurl) && (e.link = k.clickurl, e.style.cursor = "pointer");
            G = f(Y.showpercentvalues, k.showpercentvalues, 0);
            w = g(Y.numberitemsperpage,
                k.numberitemsperpage);
            f(Y.showshadow, k.showshadow, 0);
            s = g(Y.basefont, k.basefont, "Verdana,sans");
            x = Va(Y.basefontsize, k.basefontsize, 10);
            x += Sa;
            q = da(g(Y.basefontcolor, k.basefontcolor, na.getColor("baseFontColor")));
            d = da(g(Y.alternaterowbgcolor, k.alternaterowbgcolor, na.getColor("altHGridColor")));
            ja = g(Y.alternaterowbgalpha, k.alternaterowbgalpha, na.getColor("altHGridAlpha")) + Z;
            y = f(Y.listrowdividerthickness, k.listrowdividerthickness, 1);
            A = da(g(Y.listrowdividercolor, k.listrowdividercolor, na.getColor("borderColor")));
            u = f(Y.listrowdivideralpha, k.listrowdivideralpha, na.getColor("altHGridAlpha")) + 15 + Z;
            M = f(Y.colorboxwidth, k.colorboxwidth, 8);
            z = f(Y.colorboxheight, k.colorboxheight, 8);
            F = f(Y.navbuttonradius, k.navbuttonradius, 7);
            P = da(g(Y.navbuttoncolor, k.navbuttoncolor, na.getColor("canvasBorderColor")));
            t = da(g(Y.navbuttonhovercolor, k.navbuttonhovercolor, na.getColor("altHGridColor")));
            C = f(Y.textverticalpadding, k.textverticalpadding, 3);
            I = f(Y.navbuttonpadding, k.navbuttonpadding, 5);
            U = f(Y.colorboxpadding, k.colorboxpadding, 10);
            W = f(Y.valuecolumnpadding, k.valuecolumnpadding, 10);
            V = f(Y.namecolumnpadding, k.namecolumnpadding, 5);
            m = f(Y.borderthickness, k.borderthickness, 1);
            R = da(g(Y.bordercolor, k.bordercolor, na.getColor("borderColor")));
            v = g(Y.borderalpha, k.borderalpha, na.getColor("borderAlpha")) + Z;
            S = g(Y.bgcolor, k.bgcolor, "FFFFFF");
            X = g(Y.bgalpha, k.bgalpha, Ca);
            K = g(Y.bgratio, k.bgratio, Ca);
            Y = g(Y.bgangle, k.bgangle, ra);
            e.borderRadius = m / 16;
            e.borderWidth = m;
            e.borderColor = J({FCcolor: {color: R, alpha: v}});
            e.backgroundColor = {
                FCcolor: {
                    color: S,
                    alpha: X, ratio: K, angle: Y
                }
            };
            e.borderRadius = f(k.borderradius, 0);
            Y = {fontFamily: s, fontSize: x, color: q};
            ba(Y);
            Q.setStyle(Y);
            for (s = 0; s < r; s += 1) if (x = B[s], m = l.getCleanValue(x.value), R = oa(Ja(x.label, x.name)), q = da(g(x.color, na.getPlotColor())), g(x.alpha, k.plotfillalpha, Ca), R != Z || null != m) h.push({
                value: m,
                label: R,
                color: q
            }), T += m, L += 1;
            for (s = 0; s < L; s += 1) x = h[s], m = x.value, x.dataLabel = x.label, x.displayValue = G ? l.percentValue(m / T * 100) : l.dataLabels(m), B = Q.getOriSize(x.displayValue), O = Math.max(O, B.width + W);
            w ? w >= L ? (G = ua / L, w =
                L) : (l = ua - 2 * (I + F), G = l / w) : (T = parseInt(Y.lineHeight, 10), T = Math.max(T + 2 * C, z), w = ua / T, w >= L ? (G = ua / L, w = L) : (l = ua - 2 * (I + F), w = Math.floor(l / T), G = l / w));
            C = E - U - M - V - O - W;
            s = U + M + V;
            l = g(k.basefont, "Verdana,sans");
            O = Va(k.basefontsize, 10);
            na = g(k.basefontcolor, na.getColor("baseFontColor"));
            B = g(k.outcnvbasefont, l);
            x = Va(k.outcnvbasefontsize, O);
            r = x + Sa;
            k = g(k.outcnvbasefontcolor, na).replace(/^#?([a-f0-9]+)/ig, "#$1");
            O += Sa;
            na = na.replace(/^#?([a-f0-9]+)/ig, "#$1");
            N.trendStyle = N.outCanvasStyle = {fontFamily: B, color: k, fontSize: r};
            ba(N.trendStyle);
            N.inCanvasStyle = {fontFamily: l, fontSize: O, color: na};
            c.tooltip.style = {fontFamily: l, fontSize: O, lineHeight: void 0, color: na};
            c.tooltip.shadow = !1;
            e.height = ua;
            e.width = E;
            e.rowHeight = G;
            e.labelX = s;
            e.colorBoxWidth = M;
            e.colorBoxHeight = z;
            e.colorBoxX = U;
            e.valueX = U + M + V + C + W;
            e.valueColumnPadding = W;
            e.textStyle = Y;
            e.listRowDividerAttr = {"stroke-width": y, stroke: {FCcolor: {color: A, alpha: u}}};
            e.alternateRowColor = {FCcolor: {color: d, alpha: ja}};
            e.navButtonRadius = F;
            e.navButtonPadding = I;
            e.navButtonColor = P;
            e.navButtonHoverColor = t;
            e.lineHeight = parseInt(Y.lineHeight, 10);
            ua = [];
            k = 0;
            N = !0;
            for (s = 0; s < L & 0 !== w; s += 1) 0 === s % w && (ua.push({
                data: [],
                visible: N
            }), N = !1, k += 1), x = h[s], E = Q.getSmartText(x.dataLabel, C, G), ua[k - 1].data.push({
                label: E.text,
                originalText: E.tooltext,
                displayValue: x.displayValue,
                y: x.value,
                color: x.color
            });
            c.series = ua;
            n.base.parseExportOptions.call(this, c);
            c.tooltip.enabled = !!c.exporting.enabled;
            return c
        },
        creditLabel: sa
    }, n.base);
    n("renderer.bubble", {
        drawPlotBubble: function (a, p) {
            var c = this, d = c.options, k = d.chart, h = d.plotOptions.series,
                s = h.dataLabels && h.dataLabels.style || {}, ca = {
                    fontFamily: s.fontFamily,
                    fontSize: s.fontSize,
                    lineHeight: s.lineHeight,
                    fontWeight: s.fontWeight,
                    fontStyle: s.fontStyle
                }, s = c.paper, B = c.elements, r = a.items, Q = a.graphics = a.graphics || [], l = c.xAxis[p.xAxis || 0],
                ua = c.yAxis[p.yAxis || 0], w = a.data, n = !1 !== (d.tooltip || {}).enabled, G, E,
                h = isNaN(+h.animation) && h.animation.duration || 1E3 * h.animation,
                x = !1 === p.visible ? "hidden" : "visible", d = d.plotOptions.bubble, g = d.zMax, d = d.bubbleScale,
                q = t(c.canvasHeight, c.canvasWidth) / 8, g = K(g), y, A, C,
                M, z, F, P, m, T, I, U;
            y = c.layers;
            A = y.dataset = y.dataset || s.group("dataset-orphan");
            var W = y.tracker, V, L, R = function (a) {
                za.call(this, c, a)
            }, v = function (a, d, b) {
                return function (p) {
                    a.attr(d);
                    za.call(this, c, p, b)
                }
            };
            c.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", ca);
            y.datalabels ? y.datalabels.attr("class", "fusioncharts-datalabels") : y.datalabels = s.group({"class": "fusioncharts-datalabels"}, "datalables").insertAfter(A);
            ca = A.bubble = A.bubble || s.group("bubble", A);
            k.clipBubbles && !ca.attrs["clip-rect"] &&
            ca.attr({"clip-rect": B["clip-canvas"]});
            y = 0;
            for (A = w.length; y < A; y += 1) {
                C = w[y];
                I = U = L = null;
                T = C.marker;
                if (null !== C.y && T && T.enabled) {
                    M = C.link;
                    k = C.toolText;
                    z = f(C.x, y);
                    F = C.y;
                    B = {
                        index: y,
                        link: M,
                        value: F,
                        y: F,
                        x: z,
                        z: C.z,
                        displayValue: C.displayValue,
                        toolText: C.toolText,
                        id: a.userID,
                        datasetIndex: a.index,
                        datasetName: a.name,
                        visible: a.visible
                    };
                    m = ua.getAxisPosition(F);
                    P = l.getAxisPosition(z);
                    E = K(C.z);
                    V = u(E * q / g) * d || 0;
                    E = G = {};
                    C.hoverEffects && (E = {
                        fill: J(T.fillColor),
                        "stroke-width": T.lineWidth,
                        stroke: J(T.lineColor),
                        r: V
                    }, G = C.rolloverProperties,
                        G = {
                            fill: J(G.fillColor),
                            "stroke-width": G.lineWidth,
                            stroke: J(G.lineColor),
                            r: V * G.scale
                        });
                    I = s.circle(P, m, 0, ca).attr({
                        fill: J(T.fillColor),
                        "stroke-width": T.lineWidth,
                        stroke: J(T.lineColor),
                        visibility: x
                    }).animate({r: V || 0}, h, "easeOut", c.getAnimationCompleteFn());
                    if (M || n) V < b && (V = b), U = s.circle(P, m, V, W).attr({
                        cursor: M ? "pointer" : "",
                        stroke: e,
                        "stroke-width": T.lineWidth,
                        fill: e,
                        ishot: !!M,
                        visibility: x
                    });
                    (U || I).data("eventArgs", B).click(R).hover(v(I, G, "DataPlotRollOver"), v(I, E, "DataPlotRollOut")).tooltip(k);
                    r[y] = {
                        index: y,
                        x: z, y: F, z: C.z, value: F, graphic: I, dataLabel: L, tracker: U
                    };
                    L = c.drawPlotLineLabel(a, p, y, P, m)
                } else r[y] = {index: y, x: z, y: F};
                L && Q.push(L);
                I && Q.push(I);
                U && Q.push(U)
            }
            a.visible = !1 !== p.visible;
            return a
        }
    }, n["renderer.cartesian"]);
    n("renderer.ssgrid", {
        drawGraph: function () {
            var a = this.options.series, b = this.elements, c = b.plots, d = a.length, k;
            c || (c = this.plots = this.plots || [], b.plots = c);
            this.drawSSGridNavButton();
            for (k = 0; k < d; k++) (b = c[k]) || c.push(b = {
                items: [],
                data: a[k].data
            }), a[k].data && a[k].data.length && this.drawPlot(b, a[k]);
            1 < d && this.nenagitePage(0)
        }, drawPlot: function (a) {
            var b = a.data, c = this.paper, d = this.options.chart, k = d.colorBoxHeight, e = d.colorBoxWidth,
                s = d.colorBoxX, h = d.labelX, f = d.valueX, r = d.rowHeight, Q = d.width, l = d.listRowDividerAttr,
                B = l["stroke-width"], l = J(l.stroke), w = B % 2 / 2, E = d.textStyle, G = this.layers,
                G = G.dataset = G.dataset || c.group("dataset-orphan"), n = J(d.alternateRowColor);
            a = a.items;
            var x = 0, g, q, y, A;
            b && b.length || (b = []);
            l = {stroke: l, "stroke-width": B};
            A = 0;
            for (B = b.length; A < B; A += 1) y = b[A], q = y.y, g = a[A] = {
                index: A, value: q, graphic: null,
                dataLabel: null, dataValue: null, alternateRow: null, listRowDivider: null, hot: null
            }, null !== q && void 0 !== q && (0 === A % 2 && (g.alternateRow = c.rect(0, x, Q, r, 0, G).attr({
                fill: n,
                "stroke-width": 0
            })), q = u(x) + w, g.listRowDivider = c.path(["M", 0, q, "L", Q, q], G).attr(l), g.graphic = c.rect(s, x + r / 2 - k / 2, e, k, 0, G).attr({
                fill: y.color,
                "stroke-width": 0,
                stroke: "#000000"
            }), q = g.dataLabel = c.text().attr({
                text: y.label,
                title: y.originalText || "",
                x: h,
                y: x + r / 2,
                fill: E.color,
                direction: d.textDirection,
                "text-anchor": "start"
            }).css(E), G.appendChild(q), g =
                g.dataValue = c.text().attr({
                    text: y.displayValue,
                    title: y.originalText || "",
                    x: f,
                    y: x + r / 2,
                    fill: E.color,
                    direction: d.textDirection,
                    "text-anchor": "start"
                }).css(E), G.appendChild(g), x += r);
            q = u(x) + w;
            c.path(["M", 0, q, "L", Q, q], G).attr(l)
        }, drawSSGridNavButton: function () {
            var a = this, b = a.paper, c = a.options, d = c.chart, k = c.series, e = d.navButtonColor,
                s = d.navButtonHoverColor, c = d.navButtonRadius, h = .67 * c,
                f = d.navButtonPadding + h + (k && k[0].data && k[0].data.length * d.rowHeight) + .5 * c,
                d = d.width - 20, r, Q, l, B;
            1 < k.length && (B = a.naviigator =
                b.group("navigation"), a.navElePrv = k = b.group(B), r = b.path(["M", 20, f, "L", 20 + c + h, f - h, 20 + c, f, 20 + c + h, f + h, "Z"]).attr({
                fill: e,
                "stroke-width": 0,
                cursor: "pointer"
            }), k.appendChild(r), l = b.circle(20 + c, f, c).attr({
                fill: Ra,
                "stroke-width": 0,
                cursor: "pointer"
            }).mouseover(function () {
                r.attr({fill: s, cursor: "pointer"})
            }).mouseout(function () {
                r.attr({fill: e})
            }).click(function () {
                a.nenagitePage(-1)
            }), k.appendChild(l), a.navEleNxt = k = b.group(B), Q = b.path(["M", d, f, "L", d - c - h, f - h, d - c, f, d - c - h, f + h, "Z"]).attr({
                fill: e, "stroke-width": 0,
                cursor: "pointer"
            }), k.appendChild(Q), b = b.circle(d - c, f, c).attr({
                fill: Ra,
                "stroke-width": 0,
                cursor: "pointer"
            }).mouseover(function () {
                Q.attr({fill: s})
            }).mouseout(function () {
                Q.attr({fill: e})
            }).click(function () {
                a.nenagitePage(1)
            }), k.appendChild(b))
        }, nenagitePage: function (a) {
            var b = this.plots, c = b.length;
            a = (this.currentSeriesIndex || 0) + (a || 0);
            var d, k = function (a) {
                a.graphic && a.graphic.hide();
                a.dataLabel && a.dataLabel.hide();
                a.dataValue && a.dataValue.hide();
                a.alternateRow && a.alternateRow.hide();
                a.listRowDivider && a.listRowDivider.hide()
            };
            if (b[a]) {
                for (d = c; d--;) Aa(b[d].items, k);
                Aa(b[a].items, function (a) {
                    a.graphic && a.graphic.show();
                    a.dataLabel && a.dataLabel.show();
                    a.dataValue && a.dataValue.show();
                    a.alternateRow && a.alternateRow.show();
                    a.listRowDivider && a.listRowDivider.show()
                });
                this.currentSeriesIndex = a;
                ea.raiseEvent("pageNavigated", {
                    pageId: a,
                    data: this.options.series[a].data
                }, this.logic.chartInstance);
                0 === a ? this.navElePrv.hide() : this.navElePrv.show();
                a === c - 1 ? this.navEleNxt.hide() : this.navEleNxt.show()
            }
        }
    }, n["renderer.root"]);
    Ma.prototype =
        {
            getArcPath: function (a, b, c, d, k, e, s, h, f, r) {
                return c == k && d == e ? [] : ["A", s, h, 0, r, f, k, e]
            }, parseColor: function (a, b) {
                var c, d, k, e, s, h, f, r, Q, l, B = b / 2, w, E, G, g, x;
                x = 3;
                this.use3DLighting ? (c = fa(a, 80), d = fa(a, 75), h = ma(a, 85), f = ma(a, 70), r = ma(a, 40), Q = ma(a, 50), ma(a, 30), l = ma(a, 65), fa(a, 85), k = fa(a, 69), e = fa(a, 75), s = fa(a, 95)) : (x = 10, c = fa(a, 90), d = fa(a, 87), h = ma(a, 93), f = ma(a, 87), r = ma(a, 80), l = Q = ma(a, 85), ma(a, 80), s = fa(a, 85), k = fa(a, 75), e = fa(a, 80));
                w = d + $ + h + $ + f + $ + h + $ + d;
                G = b + $ + b + $ + b + $ + b + $ + b;
                E = d + $ + a + $ + h + $ + a + $ + d;
                g = B + $ + B + $ + B + $ + B + $ + B;
                r =
                    d + $ + a + $ + r + $ + a + $ + d;
                k = e + $ + h + $ + Q + $ + h + $ + k;
                e = "FFFFFF" + $ + "FFFFFF" + $ + "FFFFFF" + $ + "FFFFFF" + $ + "FFFFFF";
                x = 0 + $ + B / x + $ + b / x + $ + B / x + $ + 0;
                return {
                    frontOuter: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftX,
                            y1: 0,
                            x2: this.rightX,
                            y2: 0,
                            color: k,
                            alpha: G,
                            angle: 0,
                            ratio: "0,20,15,15,50"
                        }
                    },
                    backOuter: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftX,
                            y1: 0,
                            x2: this.rightX,
                            y2: 0,
                            color: r,
                            alpha: g,
                            angle: 0,
                            ratio: "0,62,8,8,22"
                        }
                    },
                    frontInner: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse", x1: this.leftInnerX, y1: 0, x2: this.rightInnerX, y2: 0,
                            color: E, alpha: g, angle: 0, ratio: "0,25,5,5,65"
                        }
                    },
                    backInner: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftInnerX,
                            y1: 0,
                            x2: this.rightInnerX,
                            y2: 0,
                            color: w,
                            alpha: G,
                            angle: 0,
                            ratio: "0,62,8,8,22"
                        }
                    },
                    topBorder: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftX,
                            y1: 0,
                            x2: this.rightX,
                            y2: 0,
                            color: e,
                            alpha: x,
                            angle: 0,
                            ratio: "0,20,15,15,50"
                        }
                    },
                    topInnerBorder: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftInnerX,
                            y1: 0,
                            x2: this.rightInnerX,
                            y2: 0,
                            color: e,
                            alpha: x,
                            angle: 0,
                            ratio: "0,50,15,15,20"
                        }
                    },
                    top: ka ? {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            radialGradient: !0,
                            cx: this.cx,
                            cy: this.cy,
                            r: this.rx,
                            fx: this.cx - .3 * this.rx,
                            fy: this.cy + 1.2 * this.ry,
                            color: l + $ + s,
                            alpha: b + $ + b,
                            ratio: "0,100"
                        }
                    } : {
                        FCcolor: {
                            gradientUnits: "objectBoundingBox",
                            color: f + $ + f + $ + h + $ + d,
                            alpha: b + $ + b + $ + b + $ + b,
                            angle: -72,
                            ratio: "0,8,15,77"
                        }
                    },
                    bottom: J(la(a, B)),
                    startSlice: J(la(c, b)),
                    endSlice: J(la(c, b))
                }
            }, rotate: function (a) {
                if (!this.hasOnePoint) {
                    for (var b = this.pointElemStore, c = 0, d = b.length, k; c < d; c += 1) k = b[c], k = k._confObject, k.start += a, k.end += a, this.updateSliceConf(k);
                    this.refreshDrawing()
                }
            }, refreshDrawing: function () {
                return function () {
                    var a =
                            this.slicingWallsArr, b = 0, c, d = a.length, k, e, s, h, f = this.slicingWallsFrontGroup,
                        r = this.slicingWallsBackGroup;
                    a:{
                        var Q = a[0] && a[0]._conf.index, l, B;
                        h = Q <= A;
                        k = 1;
                        for (c = a.length; k < c; k += 1) if (B = a[k]._conf.index, l = B <= A, l != h || B < Q) break a;
                        k = 0
                    }
                    for (; b < d; b += 1, k += 1) k === d && (k = 0), c = a[k], h = c._conf.index, h < Ya ? f.appendChild(c) : h <= A ? (e ? c.insertBefore(e) : f.appendChild(c), e = c) : h < Za ? (s ? c.insertBefore(s) : r.appendChild(c), s = c) : r.appendChild(c)
                }
            }(), updateSliceConf: function (a, b) {
                var c = this.getArcPath, d = a.start, k = a.end, e = ia(d), s =
                        ia(k), h, f, r, B, l, g, n, q, G, C, x, u, t, y, m, L, M = this.cx, z = this.cy, F = this.rx,
                    P = this.ry, O = F + (ka ? -1 : 2), K = P + (ka ? -1 : 2), I = this.innerRx, U = this.innerRy,
                    W = this.depth, V = this.depthY, N = a.elements, R, v, S, X, aa, Y, H;
                h = w(e);
                f = E(e);
                r = w(s);
                B = E(s);
                l = M + F * h;
                g = z + P * f;
                n = M + O * h;
                q = z + K * f;
                R = g + W;
                v = M + F * r;
                S = z + P * B;
                G = M + O * r;
                C = z + K * B;
                X = S + W;
                this.isDoughnut ? (x = M + I * h, u = z + U * f, m = u + W, t = M + I * r, y = z + U * B, L = y + W, a.startSlice = ["M", l, g, "L", l, R, x, m, x, u, "Z"], a.endSlice = ["M", v, S, "L", v, X, t, L, t, y, "Z"]) : (a.startSlice = ["M", l, g, "L", l, R, M, V, M, z, "Z"], a.endSlice = ["M",
                    v, S, "L", v, X, M, V, M, z, "Z"]);
                ka ? (c = (e > s ? T : 0) + s - e, a.clipTopPath = this.isDoughnut ? ["M", l, g, "A", F, P, 0, c > A ? 1 : 0, 1, v, S, "L", t, y, "A", I, U, 0, c > A ? 1 : 0, 0, x, u, "Z"] : ["M", l, g, "A", F, P, 0, c > A ? 1 : 0, 1, v, S, "L", this.cx, this.cy, "Z"], a.clipOuterFrontPath1 = this.clipPathforNoClip, a.clipTopBorderPath = ["M", n, q, "A", O, K, 0, c > A ? 1 : 0, 1, G, C, "L", v, S, v, S + 1, "A", F, P, 0, c > A ? 1 : 0, 0, l, g + 1, "L", l, g, "Z"], d != k ? e > s ? e < A ? (a.clipOuterFrontPath = ["M", this.rightX, z, "A", F, P, 0, 0, 1, v, S, "v", W, "A", F, P, 0, 0, 0, this.rightX, z + W, "Z"], a.clipOuterFrontPath1 = ["M", this.leftX,
                        z, "A", F, P, 0, 0, 0, l, g, "v", W, "A", F, P, 0, 0, 1, this.leftX, z + W, "Z"], a.clipOuterBackPath = ["M", this.rightX, z, "A", F, P, 0, 1, 0, this.leftX, z, "v", W, "A", F, P, 0, 1, 1, this.rightX, z + W, "Z"], this.isDoughnut && (a.clipInnerBackPath = ["M", this.rightInnerX, z, "A", I, U, 0, 1, 0, this.leftInnerX, z, "v", W, "A", I, U, 0, 1, 1, this.rightInnerX, z + W, "Z"], a.clipInnerFrontPath = ["M", this.rightInnerX, z, "A", I, U, 0, 0, 1, t, y, "v", W, "A", I, U, 0, 0, 0, this.rightInnerX, z + W, "Z", "M", this.leftInnerX, z, "A", I, U, 0, 0, 0, x, u, "v", W, "A", I, U, 0, 0, 1, this.leftInnerX, z + W, "Z"])) :
                    s > A ? (a.clipOuterFrontPath = ["M", this.rightX, z, "A", F, P, 0, 1, 1, this.leftX, z, "v", W, "A", F, P, 0, 1, 0, this.rightX, z + W, "Z"], a.clipOuterBackPath = ["M", this.leftX, z, "A", F, P, 0, 0, 1, v, S, "v", W, "A", F, P, 0, 0, 0, this.leftX, z + W, "Z", "M", this.rightX, z, "A", F, P, 0, 0, 0, l, g, "v", W, "A", F, P, 0, 0, 1, this.rightX, z + W, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M", this.rightInnerX, z, "A", I, U, 0, 1, 1, this.leftInnerX, z, "v", W, "A", I, U, 0, 1, 0, this.rightInnerX, z + W, "Z"], a.clipInnerBackPath = ["M", this.leftInnerX, z, "A", I, U, 0, 0, 1, t, y, "v", W, "A", I, U,
                        0, 0, 0, this.leftInnerX, z + W, "Z", "M", this.rightInnerX, z, "A", I, U, 0, 0, 0, x, u, "v", W, "A", I, U, 0, 0, 1, this.rightInnerX, z + W, "Z"])) : (a.clipOuterFrontPath = ["M", this.rightX, z, "A", F, P, 0, 0, 1, v, S, "v", W, "A", F, P, 0, 0, 0, this.rightX, z + W, "Z"], a.clipOuterBackPath = ["M", l, g, "A", F, P, 0, 0, 1, this.rightX, z, "v", W, "A", F, P, 0, 0, 0, l, R, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M", this.rightInnerX, z, "A", I, U, 0, 0, 1, t, y, "v", W, "A", I, U, 0, 0, 0, this.rightInnerX, z + W, "Z"], a.clipInnerBackPath = ["M", x, u, "A", I, U, 0, 0, 1, this.rightInnerX, z, "v", W, "A",
                        I, U, 0, 0, 0, x, m, "Z"])) : e < A ? s > A ? (a.clipOuterFrontPath = ["M", l, g, "A", F, P, 0, 0, 1, this.leftX, z, "v", W, "A", F, P, 0, 0, 0, l, R, "Z"], a.clipOuterBackPath = ["M", this.leftX, z, "A", F, P, 0, 0, 1, v, S, "v", W, "A", F, P, 0, 0, 0, this.leftX, z + W, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M", x, u, "A", I, U, 0, 0, 1, this.leftInnerX, z, "v", W, "A", I, U, 0, 0, 0, x, m, "Z"], a.clipInnerBackPath = ["M", this.leftInnerX, z, "A", I, U, 0, 0, 1, t, y, "v", W, "A", I, U, 0, 0, 0, this.leftInnerX, z + W, "Z"])) : (a.clipOuterFrontPath = ["M", l, g, "A", F, P, 0, 0, 1, v, S, "v", W, "A", F, P, 0, 0, 0, l, R,
                        "Z"], a.clipOuterBackPath = this.clipPathforNoClip, this.isDoughnut && (a.clipInnerFrontPath = ["M", x, u, "A", I, U, 0, 0, 1, t, y, "v", W, "A", I, U, 0, 0, 0, x, m, "Z"], a.clipInnerBackPath = this.clipPathforNoClip)) : (a.clipOuterFrontPath = this.clipPathforNoClip, a.clipOuterBackPath = ["M", l, g, "A", F, P, 0, 0, 1, v, S, "v", W, "A", F, P, 0, 0, 0, l, R, "Z"], this.isDoughnut && (a.clipInnerFrontPath = this.clipPathforNoClip, a.clipInnerBackPath = ["M", x, u, "A", I, U, 0, 0, 1, t, y, "v", W, "A", I, U, 0, 0, 0, x, m, "Z"])) : a.clipOuterFrontPath = a.clipOuterBackPath = a.clipInnerBackPath =
                        a.clipInnerFrontPath = this.clipPathforNoClip, b || (a.elements.startSlice._conf.index = e, a.elements.endSlice._conf.index = s, a.elements.frontOuter._conf.index = La(s, e), a.elements.frontOuter1 && (a.elements.frontOuter1._conf.index = e, a.elements.frontOuter1.attr("litepath", [a.clipOuterFrontPath1])), a.thisElement.attr("litepath", [a.clipTopPath]), a.elements.bottom.attr("litepath", [a.clipTopPath]), a.elements.bottomBorder.attr("litepath", [a.clipTopPath]), a.elements.topBorder && a.elements.topBorder.attr("litepath",
                    [a.clipTopBorderPath]), a.elements.frontOuter.attr("litepath", [a.clipOuterFrontPath]), a.elements.backOuter.attr("litepath", [a.clipOuterBackPath]), this.isDoughnut && (a.elements.backInner.attr("litepath", [a.clipInnerBackPath]), a.elements.frontInner.attr("litepath", [a.clipInnerFrontPath]), a.elements.backInner._conf.index = La(s, e)), this.hasOnePoint ? (a.elements.startSlice.hide(), a.elements.endSlice.hide()) : (a.elements.startSlice.attr("litepath", [a.startSlice]).show(), a.elements.endSlice.attr("litepath", [a.endSlice]).show()))) :
                    (n = this.moveCmdArr, q = this.lineCmdArr, G = this.closeCmdArr, aa = this.centerPoint, C = this.leftPoint, O = this.topPoint, K = this.rightPoint, W = this.bottomPoint, Y = this.leftDepthPoint, H = this.rightDepthPoint, h = this.leftInnerPoint, f = this.rightInnerPoint, r = this.leftInnerDepthPoint, B = this.rightInnerDepthPoint, a.clipOuterFrontPath1 = [], d != k ? (e > s ? e < A ? (d = c(M, z, l, g, this.leftX, z, F, P, 1, 0), k = c(M, z, this.leftX, z, this.rightX, z, F, P, 1, 0), S = c(M, z, this.rightX, z, v, S, F, P, 1, 0), a.clipOuterBackPath = n.concat(C, k, q, H, c(M, V, this.rightX, V,
                        this.leftX, V, F, P, 0, 0), G), a.clipOuterFrontPath1 = n.concat([l, g], d, q, Y, c(M, V, this.leftX, V, l, R, F, P, 0, 0), G), a.clipOuterFrontPath = n.concat(K, S, q, [v, X], c(M, V, v, X, this.rightX, V, F, P, 0, 0), G), a.clipTopBorderPath = n.concat([l, g], d, k, S), this.isDoughnut ? (l = c(M, z, t, y, this.rightInnerX, z, I, U, 0, 0), g = c(M, z, this.rightInnerX, z, this.leftInnerX, z, I, U, 0, 0), u = c(M, z, this.leftInnerX, z, x, u, I, U, 0, 0), a.clipInnerBackPath = n.concat(f, g, q, r, c(M, V, this.leftInnerX, V, this.rightInnerX, V, I, U, 1, 0), G), a.clipInnerFrontPath = n.concat(h, u, q,
                        [x, m], c(M, V, x, m, this.leftInnerX, V, I, U, 1, 0), G, n, [t, y], l, q, B, c(M, V, this.rightInnerX, V, t, L, I, U, 1, 0), G), a.clipTopPath = a.clipTopBorderPath.concat(q, [t, y], l, g, u, G), a.clipTopBorderPath = a.clipTopBorderPath.concat(n, [t, y], l, g, u)) : a.clipTopPath = a.clipTopBorderPath.concat(q, aa, G)) : s > A ? (d = c(M, z, l, g, this.rightX, z, F, P, 1, 0), k = c(M, z, this.rightX, z, this.leftX, z, F, P, 1, 0), S = c(M, z, this.leftX, z, v, S, F, P, 1, 0), a.clipOuterFrontPath = n.concat(K, k, q, Y, c(M, V, this.leftX, V, this.rightX, V, F, P, 0, 0), G), a.clipOuterBackPath = n.concat([l,
                        g], d, q, H, c(M, V, this.rightX, V, l, R, F, P, 0, 0), G, n, C, S, q, [v, X], c(M, V, v, X, this.leftX, V, F, P, 0, 0), G), a.clipTopBorderPath = n.concat([l, g], d, k, S), this.isDoughnut ? (l = c(M, z, t, y, this.leftInnerX, z, I, U, 0, 0), g = c(M, z, this.leftInnerX, z, this.rightInnerX, z, I, U, 0, 0), u = c(M, z, this.rightInnerX, z, x, u, I, U, 0, 0), a.clipInnerFrontPath = n.concat(h, g, q, B, c(M, V, this.rightInnerX, V, this.leftInnerX, V, I, U, 1, 0), G), a.clipInnerBackPath = n.concat(f, u, q, [x, m], c(M, V, x, m, this.rightInnerX, V, I, U, 1, 0), G, n, [t, y], l, q, r, c(M, V, this.leftInnerX, V, t, L,
                        I, U, 1, 0), G), a.clipTopPath = a.clipTopBorderPath.concat(q, [t, y], l, g, u, G), a.clipTopBorderPath = a.clipTopBorderPath.concat(n, [t, y], l, g, u)) : a.clipTopPath = a.clipTopBorderPath.concat(q, aa, G)) : (d = c(M, z, l, g, this.rightX, z, F, P, 1, 0), k = c(M, z, this.rightX, z, v, S, F, P, 1, 0), a.clipOuterFrontPath = n.concat(K, k, q, [v, X], c(M, V, v, X, this.rightX, V, F, P, 0, 0), G), a.clipOuterBackPath = n.concat([l, g], d, q, H, c(M, V, this.rightX, V, l, R, F, P, 0, 0), G), a.clipTopBorderPath = n.concat([l, g], d, k), this.isDoughnut ? (l = c(M, z, t, y, this.rightInnerX, z, I, U,
                        0, 0), g = c(M, z, this.rightInnerX, z, x, u, I, U, 0, 0), a.clipInnerFrontPath = n.concat([t, y], l, q, B, c(M, V, this.rightInnerX, V, t, L, I, U, 1, 0), G), a.clipInnerBackPath = n.concat(f, g, q, [x, m], c(M, V, x, m, this.rightInnerX, V, I, U, 1, 0), G), a.clipTopPath = a.clipTopBorderPath.concat(q, [t, y], l, g, G), a.clipTopBorderPath = a.clipTopBorderPath.concat(n, [t, y], l, g)) : a.clipTopPath = a.clipTopBorderPath.concat(q, aa, G)) : e < A ? s > A ? (d = c(M, z, l, g, this.leftX, z, F, P, 1, 0), k = c(M, z, this.leftX, z, v, S, F, P, 1, 0), a.clipOuterBackPath = n.concat(C, k, q, [v, X], c(M, V,
                        v, X, this.leftX, V, F, P, 0, 0), G), a.clipOuterFrontPath = n.concat([l, g], d, q, Y, c(M, V, this.leftX, V, l, R, F, P, 0, 0), G), a.clipTopBorderPath = n.concat([l, g], d, k), this.isDoughnut ? (l = c(M, z, t, y, this.leftInnerX, z, I, U, 0, 0), g = c(M, z, this.leftInnerX, z, x, u, I, U, 0, 0), a.clipInnerBackPath = n.concat([t, y], l, q, r, c(M, V, this.leftInnerX, V, t, L, I, U, 1, 0), G), a.clipInnerFrontPath = n.concat(h, g, q, [x, m], c(M, V, x, m, this.leftInnerX, V, I, U, 1, 0), G), a.clipTopPath = a.clipTopBorderPath.concat(q, [t, y], l, g, G), a.clipTopBorderPath = a.clipTopBorderPath.concat(n,
                        [t, y], l, g)) : a.clipTopPath = a.clipTopBorderPath.concat(q, aa, G)) : (d = c(M, z, l, g, v, S, F, P, 1, 0), a.clipOuterBackPath = n.concat([l, g]), a.clipTopBorderPath = a.clipOuterBackPath.concat(d), a.clipOuterFrontPath = a.clipTopBorderPath.concat(q, [v, X], c(M, V, v, X, l, R, F, P, 0, 0), G), this.isDoughnut ? (l = c(M, z, t, y, x, u, I, U, 0, 0), a.clipInnerBackPath = n.concat([t, y]), a.clipTopPath = a.clipTopBorderPath.concat(q, [t, y], l, G), a.clipTopBorderPath = a.clipTopBorderPath.concat(n, [t, y], l), a.clipInnerFrontPath = a.clipInnerBackPath.concat(l, q, [x,
                        m], c(M, V, x, m, t, L, I, U, 1, 0), G)) : a.clipTopPath = a.clipTopBorderPath.concat(q, aa, G)) : (d = c(M, z, l, g, v, S, F, P, 1, 0), a.clipOuterFrontPath = n.concat([l, g]), a.clipTopBorderPath = a.clipOuterFrontPath.concat(d), a.clipOuterBackPath = a.clipTopBorderPath.concat(q, [v, X], c(M, V, v, X, l, R, F, P, 0, 0), G), this.isDoughnut ? (l = c(M, z, t, y, x, u, I, U, 0, 0), a.clipInnerFrontPath = n.concat([t, y]), a.clipTopPath = a.clipTopBorderPath.concat(q, [t, y], l, G), a.clipTopBorderPath = a.clipTopBorderPath.concat(a.clipInnerFrontPath, l), a.clipInnerBackPath = a.clipInnerFrontPath.concat(l,
                        q, [x, m], c(M, V, x, m, t, L, I, U, 1, 0), G)) : a.clipTopPath = a.clipTopBorderPath.concat(q, aa, G)), d = n.concat(C, q, K), l = n.concat(O, q, W), a.clipTopPath = a.clipTopPath.concat(d, l), a.clipOuterFrontPath = a.clipOuterFrontPath.concat(d), a.clipOuterFrontPath1 = a.clipOuterFrontPath1.concat(d), a.clipOuterBackPath = a.clipOuterBackPath.concat(d), this.isDoughnut && (l = n.concat(h, q, f), a.clipInnerFrontPath = a.clipInnerFrontPath.concat(l), a.clipInnerBackPath = a.clipInnerBackPath.concat(l))) : (a.clipTopPath = a.clipOuterFrontPath = a.clipOuterBackPath =
                        [], this.isDoughnut && (a.clipInnerFrontPath = a.clipInnerBackPath = [])), b || (a.elements.startSlice._conf.index = e, a.elements.endSlice._conf.index = s, a.elements.frontOuter._conf.index = La(s, e), a.elements.frontOuter1 && (a.elements.frontOuter1._conf.index = e, N.frontOuter1.attr({path: a.clipOuterFrontPath1})), a.thisElement.attr({path: a.clipTopPath}), N.topBorder.attr({path: a.clipTopBorderPath}), N.bottom.attr({path: a.clipTopPath}), N.bottomBorder.attr({path: a.clipTopBorderPath}), N.frontOuter.attr({path: a.clipOuterFrontPath}),
                        N.backOuter.attr({path: a.clipOuterBackPath}), this.isDoughnut && (N.frontInner.attr({path: a.clipInnerFrontPath}), N.backInner.attr({path: a.clipInnerBackPath})), this.hasOnePoint ? (a.elements.startSlice.hide(), a.elements.endSlice.hide()) : (a.elements.startSlice.attr({path: a.startSlice}).show(), a.elements.endSlice.attr({path: a.endSlice}).show())))
            }, onPlotHover: function (a, b) {
                var c = this.pointElemStore[a]._confObject, d = c.thisElement, e = c.elements, h = this.colorObjs[a],
                    s = h.hoverProps, f = b ? s.hoverColorObj : h.color,
                    B = h.showBorderEffect, r = b ? s.borderColor : h.borderColor,
                    h = b ? s.borderWidth : h.borderWidth;
                ka ? (s = {
                    fill: J(f.top),
                    "stroke-width": 0
                }, 1 !== B && (s.stroke = r, s["stroke-width"] = h), d._attr(s), B && e.topBorder.attr({
                    fill: J(f.topBorder),
                    "stroke-width": 0
                })) : (d._attr({fill: J(f.top), "stroke-width": 0}), e.topBorder.attr({stroke: r, "stroke-width": h}));
                e.bottom.attr({fill: J(f.bottom), "stroke-width": 0});
                e.bottomBorder.attr({stroke: r, "stroke-width": h});
                e.frontOuter.attr({fill: J(f.frontOuter), "stroke-width": 0});
                e.backOuter.attr({
                    fill: J(f.backOuter),
                    "stroke-width": 0
                });
                e.startSlice.attr({fill: J(f.startSlice), stroke: r, "stroke-width": h});
                e.endSlice.attr({fill: J(f.endSlice), stroke: r, "stroke-width": h});
                d = ia(c.start);
                c = ia(c.end);
                (d > c ? T : 0) + c - d > A && e.frontOuter1.attr({fill: J(f.frontOuter), "stroke-width": 0});
                this.isDoughnut && (e.frontInner.attr({
                    fill: J(f.frontInner),
                    "stroke-width": 0
                }), e.backInner.attr({fill: J(f.backInner), "stroke-width": 0}))
            }, createSlice: function () {
                var a = {
                    stroke: !0,
                    strokeWidth: !0,
                    "stroke-width": !0,
                    dashstyle: !0,
                    "stroke-dasharray": !0,
                    translateX: !0,
                    translateY: !0,
                    "stroke-opacity": !0,
                    transform: !0,
                    fill: !0,
                    opacity: !0,
                    ishot: !0,
                    start: !0,
                    end: !0,
                    cursor: !0
                }, b = function (b, c) {
                    var d, e, p = this, k = p._confObject, h, f = k.elements, B, g, n = k.Pie3DManager;
                    "string" === typeof b && void 0 !== c && null !== c && (d = b, b = {}, b[d] = c);
                    if (b && "string" !== typeof b) {
                        void 0 !== b.cx && (b.start = b.cx);
                        void 0 !== b.cy && (b.end = b.cy);
                        for (d in b) if (e = b[d], a[d]) if (k[d] = e, "ishot" === d || "cursor" === d) {
                            h = {};
                            h[d] = e;
                            for (B in f) f[B].attr(h);
                            p._attr(h)
                        } else if ("transform" === d) {
                            for (B in f) f[B].attr({transform: b[d]});
                            p._attr({transform: b[d]})
                        } else "stroke" === d || "strokeWidth" === d || "stroke-width" === d || "dashstyle" === d || "stroke-dasharray" === d ? (h = {}, h[d] = e, f.topBorder && f.topBorder.attr(h), f.startSlice.attr(h), f.endSlice.attr(h), f.bottomBorder.attr(h)) : "fill" === d || "start" !== d && "end" !== d || (g = !0); else p._attr(d, e);
                        g && (n.updateSliceConf(k), n.refreshDrawing())
                    } else p = p._attr(b);
                    return p
                }, c = function (a, b, c, d) {
                    var e = this._confObject.elements, p;
                    for (p in e) if (c) e[p].drag(b, c, d); else e[p].on(a, b);
                    return c ? this.drag(b, c, d) : this._on(a,
                        b)
                }, d = function () {
                    var a = this._confObject.elements, b;
                    for (b in a) a[b].hide();
                    return this._hide()
                }, e = function () {
                    var a = this._confObject.elements, b;
                    for (b in a) a[b].show();
                    return this._show()
                }, h = function () {
                    var a = this._confObject, b = a.elements, c;
                    for (c in b) b[c].destroy();
                    ka && (a.clipTop.destroy(), a.clipOuterFront.destroy(), a.clipOuterBack.destroy(), a.clipOuterFront1 && a.clipOuterFront1.destroy(), a.clipInnerFront && a.clipInnerFront.destroy(), a.clipInnerBack && a.clipInnerBack.destroy());
                    return this._destroy()
                };
                return function (a, f, B, r, g, l, n, q, w, E) {
                    var t = this.renderer;
                    B = this.parseColor(B, r);
                    a = {start: a, end: f, elements: {}, Pie3DManager: this};
                    f = this.slicingWallsArr;
                    r = a.elements;
                    var x, u = ka ? "litepath" : "path";
                    E && (this.colorObjs[n] = {
                        color: B,
                        borderColor: g,
                        borderWidth: l,
                        showBorderEffect: !1
                    }, E.hoverColorObj = this.parseColor(E.color, E.alpha), this.colorObjs[n].hoverProps = E);
                    this.updateSliceConf(a, !0);
                    ka ? (E = {
                        fill: J(B.top),
                        "stroke-width": 0
                    }, 1 !== w && (E.stroke = g, E["stroke-width"] = l), E = t[u](a.clipTopPath, this.topGroup).attr(E),
                    w && (r.topBorder = t[u](a.clipTopBorderPath, this.topGroup).attr({
                        fill: J(B.topBorder),
                        "stroke-width": 0
                    }))) : (E = t[u](a.clipTopPath, this.topGroup).attr({
                        fill: J(B.top),
                        "stroke-width": 0
                    }), r.topBorder = t[u](a.clipTopBorderPath, this.topGroup).attr({stroke: g, "stroke-width": l}));
                    r.bottom = t[u](a.clipTopPath, this.bottomBorderGroup).attr({fill: J(B.bottom), "stroke-width": 0});
                    r.bottomBorder = t[u](ka ? a.clipTopPath : a.clipTopBorderPath, this.bottomBorderGroup).attr({
                        stroke: g,
                        "stroke-width": l
                    });
                    r.frontOuter = t[u](a.clipOuterFrontPath,
                        this.slicingWallsFrontGroup).attr({fill: J(B.frontOuter), "stroke-width": 0});
                    r.backOuter = t[u](a.clipOuterBackPath, this.outerBackGroup).attr({
                        fill: J(B.backOuter),
                        "stroke-width": 0
                    });
                    r.startSlice = t[u](a.startSlice, this.slicingWallsFrontGroup).attr({
                        fill: J(B.startSlice),
                        stroke: g,
                        "stroke-width": l
                    });
                    r.endSlice = t[u](a.endSlice, this.slicingWallsFrontGroup).attr({
                        fill: J(B.endSlice),
                        stroke: g,
                        "stroke-width": l
                    });
                    g = ia(a.start);
                    l = ia(a.end);
                    w = (g > l ? T : 0) + l - g;
                    w > A && (r.frontOuter1 = t[u](a.clipOuterFrontPath1, this.slicingWallsFrontGroup).attr({
                        fill: J(B.frontOuter),
                        "stroke-width": 0
                    }), r.frontOuter1._conf = {
                        index: g,
                        isStart: .5,
                        pIndex: n
                    }, ka && (a.clipOuterFront1 = a.clipOuterFrontPath1));
                    r.frontOuter._conf = {index: La(l, g), isStart: .5, pIndex: n};
                    r.startSlice._conf = {index: g, isStart: 0, pIndex: n};
                    r.endSlice._conf = {index: l, isStart: 1, pIndex: n};
                    this.hasOnePoint && (r.startSlice.hide(), r.endSlice.hide());
                    this.isDoughnut ? (r.frontInner = t[u](a.clipInnerFrontPath, this.innerFrontGroup).attr({
                        fill: J(B.frontInner),
                        "stroke-width": 0
                    }), r.backInner = t[u](a.clipInnerBackPath, this.innerBackGroup).attr({
                        fill: J(B.backInner),
                        "stroke-width": 0
                    }), r.backInner._conf = {
                        index: La(l, g),
                        isStart: .5,
                        pIndex: n
                    }, w > A ? ka ? f.push(r.startSlice, r.frontOuter1, r.frontOuter, r.backInner, r.endSlice) : f.push(r.startSlice, r.frontOuter1, r.frontOuter, r.endSlice) : ka ? f.push(r.startSlice, r.frontOuter, r.backInner, r.endSlice) : f.push(r.startSlice, r.frontOuter, r.endSlice)) : w > A ? f.push(r.startSlice, r.frontOuter1, r.frontOuter, r.endSlice) : f.push(r.startSlice, r.frontOuter, r.endSlice);
                    if (void 0 !== q) {
                        for (x in r) r[x].tooltip(q);
                        E.tooltip(q)
                    }
                    ka && (a.clipTop = a.clipTopPath,
                        a.clipOuterFront = a.clipOuterFrontPath, a.clipOuterBack = a.clipOuterBackPath, this.isDoughnut && (a.clipInnerFront = a.clipInnerFrontPath, a.clipInnerBack = a.clipInnerBackPath));
                    E._confObject = a;
                    a.thisElement = E;
                    E._destroy = E.destroy;
                    E.destroy = h;
                    E._show = E.show;
                    E.show = e;
                    E._hide = E.hide;
                    E.hide = d;
                    E._on = E.on;
                    E.on = c;
                    E._attr = E.attr;
                    E.attr = b;
                    this.pointElemStore.push(E);
                    return E
                }
            }()
        };
    Ma.prototype.constructor = Ma;
    n("renderer.pie3d", {
        type: "pie3d", isHovered: !1, translate: function () {
            var a = 0, b = this.options, c = b.series[0], d = b.plotOptions.series.dataLabels,
                e = b.plotOptions.pie3d, h = g(c.startAngle, 0) % 360, s = c.managedPieSliceDepth,
                n = c.slicedOffset = e.slicedOffset, q = this.canvasWidth, r = this.canvasHeight,
                Q = [this.canvasLeft + .5 * q, this.canvasTop + .5 * r - .5 * s], l, A, C, m, G, b = c.data, K,
                x = t(q, r), O, aa, y, H = d.distance, ha = c.pieYScale, M = c.pieSliceDepth,
                z = c.slicedOffsetY = n * ha;
            Q.push(e.size, e.innerSize || 0);
            Q = pa(Q, function (a, b) {
                return (O = /%$/.test(a)) ? [q, r - s, x, x][b] * parseInt(a, 10) / 100 : a
            });
            Q[2] /= 2;
            Q[3] /= 2;
            Q.push(Q[2] * ha);
            Q.push((Q[2] + Q[3]) / 2);
            Q.push(Q[5] * ha);
            c.getX = function (a, b) {
                C =
                    B.asin((a - Q[1]) / (Q[2] + H));
                return Q[0] + (b ? -1 : 1) * w(C) * (Q[2] + H)
            };
            c.center = Q;
            Aa(b, function (b) {
                a += b.y
            });
            c.labelsRadius = Q[2] + H;
            c.labelsRadiusY = c.labelsRadius * ha;
            c.quadrantHeight = (r - s) / 2;
            c.quadrantWidth = q / 2;
            m = -h * N;
            m = u(1E3 * m) / 1E3;
            G = m + T;
            e = f(parseInt(d.style.fontSize, 10), 10) + 4;
            c.maxLabels = L(c.quadrantHeight / e);
            c.labelFontSize = e;
            c.connectorPadding = f(d.connectorPadding, 5);
            c.isSmartLineSlanted = g(d.isSmartLineSlanted, !0);
            c.connectorWidth = f(d.connectorWidth, 1);
            c.enableSmartLabels = d.enableSmartLabels;
            c.Pie3DManager ||
            (c.Pie3DManager = new Ma(Q[0], Q[1], Q[2], Q[3], ha, M, this.layers.dataset, this.paper, 1 === c.data.length, c.use3DLighting));
            Aa(b, function (b) {
                l = m;
                K = a ? b.y / a : 0;
                m = u(1E3 * (m + K * T)) / 1E3;
                m > G && (m = G);
                A = m;
                b.shapeArgs = {start: u(1E3 * l) / 1E3, end: u(1E3 * A) / 1E3};
                b.centerAngle = C = (A + l) / 2 % T;
                b.slicedTranslation = [u(w(C) * n), u(E(C) * z)];
                aa = w(C) * Q[2];
                c.radiusY = y = E(C) * Q[4];
                b.tooltipPos = [Q[0] + .7 * aa, Q[1] + y];
                b.percentage = 100 * K;
                b.total = a
            })
        }, drawPlotPie3d: function (a, b) {
            this.translate();
            var c = this, d = a.items, e = a.data, h = c.options, s = h.plotOptions,
                B = s.series, g = c.layers, r = c.elements.plots[0], n = c.datasets[0], s = s.series.dataLabels,
                l = B.dataLabels.style, B = f(a.moveDuration, B.animation.duration), q = c.paper, t = h.tooltip || {},
                t = t && !1 !== t.enabled, u = n.slicedOffset, A = n.slicedOffsetY, C = c.plotDragMove,
                x = c.plotDragStart, m = c.plotDragEnd, L = c.plotRollOver, y = c.plotRollOut,
                T = !!c.datasets[0].enableRotation, K = b.showBorderEffect, M = e.length, z = h.chart,
                h = z.usePerPointLabelColor, z = z.textDirection, F = {
                    fontFamily: l.fontFamily, fontSize: l.fontSize, lineHeight: l.lineHeight, fontWeight: l.fontWeight,
                    fontStyle: l.fontStyle
                }, P = function (a) {
                    return function () {
                        c.legendClick(a, !0, !1)
                    }
                }, O = function (a) {
                    return function () {
                        return c.getEventArgs(a)
                    }
                }, N = function (a) {
                    return function (b, c, d, e, p) {
                        C.call(a, b, c, d, e, p)
                    }
                }, I = function (a) {
                    return function (b, c, d) {
                        x.call(a, b, c, d)
                    }
                }, U = function (a) {
                    return function (b) {
                        m.call(a, b)
                    }
                }, W = function (a) {
                    return function (b) {
                        y.call(a, b)
                    }
                }, V = function (a) {
                    return function (b) {
                        L.call(a, b)
                    }
                }, aa, R, v, S, X, H, Y, ha, D, $;
            e && M || (e = []);
            r.singletonCase = 1 === M;
            r.chartPosition = Da(c.container);
            r.pieCenter = n.center;
            r.timerThreshold = 30;
            for ($ = -1; ++$ < M;) v = e[$], l = v.y, S = v.displayValue, F = v.sliced, ha = v.shapeArgs, aa = v.centerAngle, D = v.toolText, H = (X = !!v.link) || T || !v.doNotSlice, null === l || void 0 === l || (R = d[$]) || (b.data[$].plot = R = d[$] = {
                chart: c,
                index: $,
                seriesData: r,
                value: l,
                angle: aa,
                link: v.link,
                shapeArgs: ha,
                slicedX: F && !r.singletonCase ? w(aa) * u : 0,
                slicedY: F && !r.singletonCase ? E(aa) * A : 0,
                sliced: F,
                labelText: S,
                name: v.name,
                label: v.name,
                percentage: v.percentage,
                toolText: D,
                originalIndex: M - $ - 1,
                style: v.style,
                graphic: n.Pie3DManager.createSlice(ha.start,
                    ha.end, v.color, v._3dAlpha, v.borderColor, v.borderWidth, $, t ? D : "", K, v.rolloverProperties)
            }, b.data[$].legendClick = P(R), b.data[$].getEventArgs = O(R), R.graphic.plotItem = R, R.graphic.data("plotItem", R), R.transX = w(aa) * u, R.transY = E(aa) * A, R.slicedTranslation = "t" + R.transX + "," + R.transY, aa = {
                index: b.reversePlotOrder ? $ : M - 1 - $,
                link: v.link,
                value: v.y,
                displayValue: v.displayValue,
                categoryLabel: v.categoryLabel,
                isSliced: v.sliced,
                toolText: v.toolText
            }, R.graphic.attr({
                transform: "t" + R.slicedX + "," + R.slicedY, ishot: H, cursor: X ? "pointer" :
                    ""
            }).drag(N(R), I(R), U(R)).data("groupId", $).data("eventArgs", aa).mouseover(V(R)).mouseout(W(R)), void 0 !== S && (l = v.style, F = {
                fontFamily: l.fontFamily,
                fontSize: l.fontSize,
                lineHeight: l.lineHeight,
                fontWeight: l.fontWeight,
                fontStyle: l.fontStyle
            }, R.dataLabel = q.text(g.dataset).css(F).attr({
                text: S,
                title: v.originalText || "",
                fill: (h ? J(v.color) : l.color) || "#000000",
                "text-bound": [l.backgroundColor, l.borderColor, l.borderThickness, l.borderPadding, l.borderRadius, l.borderDash],
                visibility: "hidden",
                direction: z,
                ishot: H,
                cursor: X ?
                    "pointer" : ""
            }).data("eventArgs", aa).hover(V(R), W(R)).drag(N(R), I(R), U(R)).data("plotItem", R), 0 < s.distance && (Y = s.connectorWidth) && s.enableSmartLabels && (R.connector = q.path("M 0 0 l 0 0", g.dataset).attr({
                "stroke-width": Y,
                stroke: s.connectorColor || "#606060",
                visibility: "hidden",
                ishot: H,
                cursor: X ? "pointer" : ""
            }).data("eventArgs", aa).hover(V(R), W(R)).drag(N(R), I(R), U(R)).data("plotItem", R))));
            n.Pie3DManager.refreshDrawing();
            0 < B ? c.animate(d, B) : c.placeDataLabels(!1, d)
        }, rotate: function (a) {
            var b = this.datasets[0],
                c = this.elements.plots[0].items, d = b.slicedOffset, e = b.slicedOffsetY, h = b.startAngle, B;
            a = isNaN(a) ? -b._lastAngle : a;
            B = (a - h) % 360;
            b.startAngle = f(a, b.startAngle) % 360;
            B = -(B * H) / 180;
            b.Pie3DManager && b.Pie3DManager.rotate(B);
            Aa(c, function (a) {
                var b = a.graphic, c = a.shapeArgs, p = c.start += B, c = c.end += B, h = a.angle = ia((p + c) / 2),
                    p = a.sliced, c = w(h), h = E(h);
                a.slicedTranslation = [u(c * d), u(h * e)];
                a.transX = a.slicedTranslation[0];
                a.transY = a.slicedTranslation[1];
                a.slicedX = p ? w(B) * d : 0;
                a.slicedY = p ? E(B) * e : 0;
                b && p && a.graphic.attr({
                    transform: "t" +
                    a.slicedTranslation[0] + "," + a.slicedTranslation[1]
                })
            });
            this.placeDataLabels(!0, c)
        }, plotRollOver: function (a) {
            var b = this.chart, c = b.datasets[0].Pie3DManager;
            this.seriesData.isRotating || (za.call(this.graphic, b, a, "DataPlotRollOver"), c.colorObjs[this.index] && c.onPlotHover(this.index, !0));
            b.isHovered = !0
        }, plotRollOut: function (a) {
            var b = this.chart, c = b.datasets[0].Pie3DManager;
            this.seriesData.isRotating || (za.call(this.graphic, b, a, "DataPlotRollOut"), c.colorObjs[this.index] && c.onPlotHover(this.index, !1));
            b.isHovered =
                !1
        }, plotDragStart: function (a, b, c) {
            var d = this.seriesData, e = this.chart.datasets[0];
            d.isRotating = !1;
            e.enableRotation && (a = Pa.call(c, a, b, d.pieCenter, d.chartPosition, e.pieYScale), e.dragStartAngle = a, e._lastAngle = -e.startAngle, e.startingAngleOnDragStart = e.startAngle)
        }, plotDragEnd: function (a) {
            var b = this.chart, c = b.datasets[0], d = c.Pie3DManager, e = c.startAngle, h = this.seriesData,
                f = {hcJSON: {series: [{startAngle: e}]}};
            b.disposed || xa(b.logic.chartInstance.jsVars._reflowData, f, !0);
            !h.isRotating && b.plotGraphicClick.call(this,
                a);
            h.isRotating && (setTimeout(function () {
                h.isRotating = !1
            }, 0), ea.raiseEvent("rotationEnd", {
                startingAngle: ia(e, !0),
                changeInAngle: e - c.startingAngleOnDragStart
            }, b.logic.chartInstance), !b.isHovered && d.colorObjs[this.index] && d.onPlotHover(this.index, !1))
        }, plotDragMove: function (a, b, c, d, e) {
            var h = this.chart;
            a = h.datasets[0];
            b = this.seriesData;
            h.options.series[0].enableRotation && !b.singletonCase && (c = Pa.call(e, c, d, b.pieCenter, b.chartPosition, a.pieYScale), b.isRotating || (a.dragStartAngle !== c && (b.isRotating = !0), ea.raiseEvent("rotationStart",
                {startingAngle: ia(a.startAngle, !0)}, h.logic.chartInstance)), d = c - a.dragStartAngle, a.dragStartAngle = c, b.moveDuration = 0, a._lastAngle += 180 * d / H, c = (new Date).getTime(), !a._lastTime || a._lastTime + b.timerThreshold < c) && (a._lastTime || h.rotate(), b.timerId = setTimeout(function () {
                h.disposed && h.disposing || h.rotate()
            }, b.timerThreshold), a._lastTime = c)
        }, animate: function (a, b) {
            var c, d, e, h = a.length, f, B, g, r = this, n, l = function () {
                r.disposed || r.disposing || r.placeDataLabels(!1, a)
            };
            if (r.datasets[0].alphaAnimation) r.layers.dataset.attr({opacity: 0}),
                r.layers.dataset.animate({opacity: 1}, b, "ease-in", function () {
                    r.disposed || r.disposing || r.placeDataLabels(!1, a)
                }); else for (c = 0; c < h; c++) f = a[c], B = f.graphic, g = f.shapeArgs, f = 2 * H, B && (B.attr({
                start: f,
                end: f
            }), n = g.start, g = g.end, d ? B.animateWith(d, e, {
                cx: n - f,
                cy: g - f
            }, b, "ease-in") : (e = ga.animation({cx: n - f, cy: g - f}, b, "ease-in", l), d = B.animate(e)))
        }, placeDataLabels: function () {
            var a = function (a, b) {
                return a.point.value - b.point.value
            }, b = function (a, b) {
                return a.angle - b.angle
            }, c = ["start", "start", "end", "end"], d = [-1, 1, 1, -1], e =
                [1, 1, -1, -1];
            return function (g, n) {
                var m = this.datasets[0], L = this.smartLabel, r = this.options.plotOptions.series.dataLabels,
                    Q = r.style, l = f(C(parseFloat(Q.lineHeight)), 12), K = Ja(r.placeInside, !1),
                    N = r.skipOverlapLabels, aa = r.manageLabelOverflow, G = r.connectorPadding, O = r.connectorWidth,
                    x, H, $ = 0 < r.distance, y = m.center, D = y[1], J = y[0], M = y[2], z = y[4],
                    F = [[], [], [], []], P, Z, fa, I = this.canvasLeft, U = this.canvasTop, W = this.canvasWidth, V,
                    ba, R, v, S, X, da, Y, ma, la, va, ia = m.labelsRadius, ga = u(100 * m.labelsRadiusY) / 100,
                    ka = m.labelFontSize,
                    Ba = ka, Fa = Ba / 2, G = [G, G, -G, -G], oa = m.maxLabels, ra = m.isSmartLineSlanted,
                    sa = m.enableSmartLabels, ea, m = m.pieSliceDepth / 2;
                g || L.setStyle(Q);
                if (1 == n.length) v = n[0], ea = v.dataLabel, v.slicedTranslation = [I, U], ea && (ea.attr({
                    visibility: h,
                    "text-anchor": "middle",
                    x: J,
                    y: D + Fa - 2
                }), ea.x = J); else if (K) Aa(n, function (a) {
                    if (ea = a.dataLabel) {
                        va = a.angle;
                        la = D + y[6] * E(va) + Fa - 2;
                        da = J + y[5] * w(va);
                        ea.x = da;
                        ea._x = da;
                        ea.y = la;
                        if (a.sliced) {
                            a = a.slicedTranslation;
                            var b = a[1] - U;
                            da += a[0] - I;
                            la += b
                        }
                        ea.attr({visibility: h, align: "middle", x: da, y: la})
                    }
                });
                else {
                    Aa(n, function (a) {
                        if (ea = a.dataLabel) va = a.angle, 0 > va && (va = T + va), P = 0 <= va && va < Ya ? 1 : va < A ? 2 : va < Za ? 3 : 0, F[P].push({
                            point: a,
                            angle: va
                        })
                    });
                    for (fa = K = 4; fa--;) {
                        if (N && (v = F[fa].length - oa, 0 < v)) for (F[fa].sort(a), Z = F[fa].splice(0, v), ba = 0, R = Z.length; ba < R; ba += 1) v = Z[ba].point, v.dataLabel.attr({visibility: "hidden"}), v.connector && v.connector.attr({visibility: "hidden"});
                        F[fa].sort(b)
                    }
                    fa = q(F[0].length, F[1].length, F[2].length, F[3].length);
                    ga = q(t(fa, oa) * Ba, ga + Ba);
                    F[1].reverse();
                    F[3].reverse();
                    for (L.setStyle(Q); K--;) {
                        ba =
                            F[K];
                        R = ba.length;
                        N || (Ba = R > oa ? ga / R : ka, Fa = Ba / 2);
                        v = R * Ba;
                        Q = ga;
                        for (fa = 0; fa < R; fa += 1, v -= Ba) H = ha(ga * E(ba[fa].angle)), Q < H ? H = Q : H < v && (H = v), Q = (ba[fa].oriY = H) - Ba;
                        Z = c[K];
                        R = ga - (R - 1) * Ba;
                        Q = 0;
                        for (fa = ba.length - 1; 0 <= fa; --fa, R += Ba) v = ba[fa].point, va = ba[fa].angle, S = v.sliced, ea = v.dataLabel, H = ha(ga * E(va)), H < Q ? H = Q : H > R && (H = R), Q = H + Ba, Y = (H + ba[fa].oriY) / 2, H = J + e[K] * ia * w(B.asin(Y / ga)), Y *= d[K], Y += D, ma = D + z * E(va), X = J + M * w(va), (2 > K && H < X || 1 < K && H > X) && (H = X), da = H + G[K], la = Y + Fa - 2, x = da + G[K], ea.x = x, ea._x = x, aa && (V = 1 < K ? x - this.canvasLeft : this.canvasLeft +
                            W - x, L.setStyle(v.style), l = f(C(parseFloat(v.style.lineHeight)), 12) + 2 * C(parseFloat(v.style.border), 12), l = L.getSmartText(v.labelText, V, l), ea.attr({
                            text: l.text,
                            title: l.tooltext || ""
                        })), va < A && (Y += m, ma += m, la += m), ea.y = la, S && (l = v.transX, S = v.transY, da += l, H += l, X += l, ma += S, x += l), ea.attr({
                            visibility: h,
                            "text-anchor": Z,
                            x: x,
                            y: Y
                        }), $ && O && sa && (x = v.connector, v.connectorPath = H = ["M", X, ma, "L", ra ? H : X, Y, da, Y], x ? (x.attr({path: H}), x.attr("visibility", h)) : v.connector = x = this.paper.path(H).attr({
                            "stroke-width": O, stroke: r.connectorColor ||
                            "#606060", visibility: h
                        }))
                    }
                }
            }
        }()
    }, n["renderer.piebase"]);
    n("renderer.pie", {
        drawDoughnutCenterLabel: function (a, b, c, d, e, f, B) {
            var g = this.options.series[0];
            f = f || g.lastCenterLabelConfig;
            var n = this.paper, r = this.smartLabel, q = this.layers.dataset, l = this.elements, E = f.padding,
                t = 2 * f.textPadding, w = {
                    fontFamily: f.font,
                    fontSize: f.fontSize + "px",
                    lineHeight: 1.2 * f.fontSize + "px",
                    fontWeight: f.bold ? "bold" : "",
                    fontStyle: f.italic ? "italic" : ""
                }, u = 1.414 * (.5 * d - E) - t;
            e = 1.414 * (.5 * e - E) - t;
            var m;
            r.setStyle(w);
            r = r.getSmartText(a, u, e);
            (e = l.doughnutCenterLabel) ? (e.attr("text") !== a && this.centerLabelChange(a), m = l.centerLabelOvalBg) : (f.bgOval && (l.centerLabelOvalBg = m = n.circle(b, c, .5 * d - E, q)), e = l.doughnutCenterLabel = n.text(q).hover(this.centerLabelRollover, this.centerLabelRollout).click(this.centerLabelClick), e.chart = this);
            a ? (e.css(w).attr({
                x: b,
                y: c,
                text: r.text,
                visibility: h,
                direction: this.options.chart.textDirection,
                title: f.toolText ? "" : r.tooltext || "",
                fill: J({FCcolor: {color: f.color, alpha: f.alpha}}),
                "text-bound": f.bgOval ? "none" : [J({
                    FCcolor: {
                        color: f.bgColor,
                        alpha: f.bgAlpha
                    }
                }), J({
                    FCcolor: {
                        color: f.borderColor,
                        alpha: f.borderAlpha
                    }
                }), f.borderThickness, f.textPadding, f.borderRadius]
            }).tooltip(f.toolText), f.bgOval && m && m.attr({
                visibility: h,
                fill: ab(f.bgColor),
                "fill-opacity": f.bgAlpha / 100,
                stroke: ab(f.borderColor),
                "stroke-width": f.borderThickness,
                "stroke-opacity": f.borderAlpha / 100
            })) : (e.attr("visibility", "hidden"), m && m.attr("visibility", "hidden"));
            B && (g.lastCenterLabelConfig = f)
        }, centerLabelRollover: function () {
            var a = this.chart, b = a.fusionCharts, c = a.options.series[0].lastCenterLabelConfig,
                b = {
                    height: b.args.height,
                    width: b.args.width,
                    pixelHeight: b.ref.offsetHeight,
                    pixelWidth: b.ref.offsetWidth,
                    id: b.args.id,
                    renderer: b.args.renderer,
                    container: b.options.containerElement,
                    centerLabelText: c && c.label
                };
            this.attr("text") && ea.raiseEvent("centerLabelRollover", b, a.logic.chartInstance, this, a.hoverOnCenterLabel)
        }, centerLabelRollout: function () {
            var a = this.chart, b = a.fusionCharts, c = a.options.series[0].lastCenterLabelConfig, b = {
                height: b.args.height,
                width: b.args.width,
                pixelHeight: b.ref.offsetHeight,
                pixelWidth: b.ref.offsetWidth,
                id: b.args.id,
                renderer: b.args.renderer,
                container: b.options.containerElement,
                centerLabelText: c && c.label
            };
            this.attr("text") && ea.raiseEvent("centerLabelRollout", b, a.logic.chartInstance, this, a.hoverOffCenterLabel)
        }, centerLabelClick: function () {
            var a = this.chart, b = a.fusionCharts, c = a.options.series[0].lastCenterLabelConfig, b = {
                height: b.args.height,
                width: b.args.width,
                pixelHeight: b.ref.offsetHeight,
                pixelWidth: b.ref.offsetWidth,
                id: b.args.id,
                renderer: b.args.renderer,
                container: b.options.containerElement,
                centerLabelText: c &&
                c.label
            };
            this.attr("text") && ea.raiseEvent("centerLabelClick", b, a.logic.chartInstance)
        }, centerLabelChange: function (a) {
            var b = this.fusionCharts;
            ea.raiseEvent("centerLabelChanged", {
                height: b.args.height,
                width: b.args.width,
                pixelHeight: b.ref.offsetHeight,
                pixelWidth: b.ref.offsetWidth,
                id: b.args.id,
                renderer: b.args.renderer,
                container: b.options.containerElement,
                centerLabelText: a
            }, this.logic.chartInstance)
        }, hoverOnCenterLabel: function () {
            var a = this.chart.options.series[0].lastCenterLabelConfig;
            (a.hoverColor || a.hoverAlpha) &&
            this.attr({fill: J({FCcolor: {color: a.hoverColor || a.color, alpha: a.hoverAlpha || a.alpha}})})
        }, hoverOffCenterLabel: function () {
            var a = this.chart.options.series[0].lastCenterLabelConfig;
            (a.hoverColor || a.hoverAlpha) && this.attr({fill: J({FCcolor: {color: a.color, alpha: a.alpha}})})
        }, drawPlotPie: function (a, b) {
            var c = this, d = a.items, e = a.data, B = c.options, g = B.series[0], n = B.plotOptions, q = n.pie,
                r = n.series, t = c.layers, l = t.dataset, u = c.elements.plots[0], n = n.series.dataLabels,
                m = r.dataLabels.style, C = r.shadow, r = f(a.moveDuration,
                r.animation.duration), G = c.paper, K = B.tooltip || {}, K = K && !1 !== K.enabled,
                x = ((b.startAngle *= -A / 180) || 0) % T, H = q.slicedOffset, L = b.valueTotal, y = T / L,
                N = c.canvasLeft + .5 * c.canvasWidth, O = c.canvasTop + .5 * c.canvasHeight, M = .5 * q.size,
                q = .5 * (q.innerSize || 0), z = c.plotDragMove, F = c.plotDragStart, P = c.plotDragEnd,
                aa = c.plotRollOver, ha = c.plotRollOut, I = !!c.datasets[0].enableRotation, U = e.length, W = B.chart,
                B = W.usePerPointLabelColor, W = W.textDirection, V = g.centerLabelConfig, $ = V.label, R = {
                    fontFamily: m.fontFamily, fontSize: m.fontSize, lineHeight: m.lineHeight,
                    fontWeight: m.fontWeight, fontStyle: m.fontStyle
                }, v, S, X, D, Y, fa, ba, Z, da, ma, la = a.shadowGroup, ea, Ba, ia, ka, Fa, oa = function (a) {
                    return function () {
                        c.legendClick(a, !0, !1)
                    }
                }, ra = function (a) {
                    return function () {
                        return c.getEventArgs(a)
                    }
                }, sa = function () {
                    c.disposed || c.disposing || c.paper.ca.redrawDataLabels || (c.placeDataLabels(!1, d, a), c.paper.ca.redrawDataLabels = c.redrawDataLabels)
                };
            e && U || (e = []);
            la || (la = a.shadowGroup = G.group(l).toBack());
            u.singletonCase = 1 === U;
            u.chartPosition || (u.chartPosition = Da(c.container));
            u.pieCenter =
                [N, O];
            u.timerThreshold = 30;
            da = Z = x;
            for (ea = U; ea--;) S = e[ea], R = S.y, X = S.displayValue, Y = S.sliced, m = S.toolText, fa = (D = !!S.link) || I || !S.doNotSlice, null !== R && void 0 !== R && (v = S.color.FCcolor, v.r = M, v.cx = N, v.cy = O, S.rolloverProperties && (v = S.rolloverProperties.color.FCcolor, v.r = M, v.cx = N, v.cy = O), da = Z, Z -= u.singletonCase ? T : R * y, ba = .5 * (Z + da), r ? ka = Fa = x : (ka = Z, Fa = da), (v = d[ea]) || (b.data[ea].plot = v = d[ea] = {
                chart: c,
                index: ea,
                seriesData: u,
                value: R,
                angle: ba,
                slicedX: w(ba) * H,
                slicedY: E(ba) * H,
                sliced: Y,
                labelText: X,
                toolText: m,
                label: S.name,
                link: S.link,
                percentage: L ? R * L / 100 : 0,
                originalIndex: U - ea - 1,
                style: S.style,
                color: S.color,
                borderColor: S.borderColor,
                borderWidth: S.borderWidth,
                rolloverProperties: S.rolloverProperties,
                center: [N, O],
                innerDiameter: 2 * q,
                centerLabelConfig: S.centerLabelConfig,
                graphic: G.ringpath(N, O, M, q, ka, Fa, t.dataset).attr({
                    "stroke-width": S.borderWidth,
                    "stroke-linejoin": "round",
                    stroke: S.borderColor,
                    fill: J(S.color),
                    "stroke-dasharray": S.dashStyle,
                    redrawDataLabels: x,
                    ishot: fa,
                    cursor: D ? "pointer" : ""
                }).shadow(C && S.shadow, la).drag(z, F,
                    P).hover(aa, ha)
            }, K && v.graphic.tooltip(m), b.data[ea].legendClick = oa(v), b.data[ea].getEventArgs = ra(v), v.graphic.data("plotItem", v), D = {
                index: b.reversePlotOrder ? ea : U - 1 - ea,
                link: S.link,
                value: S.y,
                displayValue: S.displayValue,
                categoryLabel: S.categoryLabel,
                isSliced: S.sliced,
                toolText: S.toolText
            }, v.graphic.data("eventArgs", D), void 0 !== X && (m = S.style, R = {
                fontFamily: m.fontFamily,
                fontSize: m.fontSize,
                lineHeight: m.lineHeight,
                fontWeight: m.fontWeight,
                fontStyle: m.fontStyle
            }, v.dataLabel = G.text(l).css(R).attr({
                text: X,
                fill: (B ?
                    J(S.color) : m.color) || "#000000",
                "text-bound": [m.backgroundColor, m.borderColor, m.borderThickness, m.borderPadding, m.borderRadius, m.borderDash],
                ishot: fa,
                direction: W,
                visibility: "hidden"
            }).drag(z, F, P).hover(aa, ha).data("eventArgs", D).hide(), v.dataLabel.data("plotItem", v), 0 < n.distance && (ma = n.connectorWidth) && n.enableSmartLabels && (v.connector = G.path("M 0 0 l 0 0", l).attr({
                "stroke-width": ma,
                stroke: n.connectorColor || "#606060",
                visibility: h,
                ishot: !0
            }).data("eventArgs", D).drag(z, F, P).hover(aa, ha), v.connector.data("plotItem",
                v)))), v.angle = ba, v.transX = w(ba) * H, v.transY = E(ba) * H, v.slicedTranslation = "t" + w(ba) * H + "," + E(ba) * H, r ? Ba ? v.graphic.animateWith(Ba, ia, {
                ringpath: [N, O, M, q, Z, da],
                transform: v.sliced ? v.slicedTranslation : ""
            }, r, "easeIn") : (ia = ga.animation({
                ringpath: [N, O, M, q, Z, da],
                redrawDataLabels: c,
                transform: v.sliced ? v.slicedTranslation : ""
            }, r, "easeIn", sa), Ba = v.graphic.animate(ia)) : v.graphic.attr({transform: v.sliced ? v.slicedTranslation : ""}));
            $ && q && c.drawDoughnutCenterLabel($, N, O, 2 * q, 2 * q, V, !0);
            g.lastCenterLabelConfig = V;
            r ? g.doughnutCenterLabel &&
                g.doughnutCenterLabel.attr({"fill-opacity": 0}).animate(ga.animation({"fill-opacity": 100}, 100).delay(100 < r ? r - 100 : 0)) : c.placeDataLabels(!1, d, a)
        }, rotate: function (a, b) {
            var c = a.items, d = a.data, e = this.options.plotOptions.pie, h = e.slicedOffset, f = T / b.valueTotal,
                B = this.canvasLeft + .5 * this.canvasWidth, g = this.canvasTop + .5 * this.canvasHeight,
                r = .5 * e.size, e = .5 * (e.innerSize || 0), n, l, q, m, t;
            q = (b.startAngle || 0) % T;
            for (t = d.length; t--;) n = d[t], l = n.y, null !== l && void 0 !== l && (n = c[t], m = q, q -= n.seriesData.singletonCase ? T : l * f, l = .5 *
                (q + m), n.angle = l, n.transX = w(l) * h, n.transY = E(l) * h, n.slicedTranslation = "t" + w(l) * h + "," + E(l) * h, n.graphic.attr({
                ringpath: [B, g, r, e, q, m],
                transform: n.sliced ? n.slicedTranslation : ""
            }));
            this.placeDataLabels(!0, c, a)
        }
    }, n["renderer.piebase"])
}, [3, 2, 2, "sr4"]]);
FusionCharts.register("module", ["private", "modules.renderer.js-zoomline", function () {
    var Da = this, pa = Da.hcLib, ia = Da.window, La = /msie/i.test(ia.navigator.userAgent) && !ia.opera,
        Pa = pa.chartAPI, Ma = pa.chartAPI, ea = pa.extend2, D = pa.raiseEvent, ga = pa.pluck, m = pa.pluckNumber,
        Ka = pa.getFirstColor, Z = pa.graphics.convertColor, Xa = pa.bindSelectionEvent, g = pa.createTrendLine,
        wa = pa.parseUnsafeString, Ia = pa.regescape, f = pa.Raphael, Ja = pa.hasTouch, Ua = pa.getMouseCoordinate,
        oa = pa.FC_CONFIG_STRING, ta = "rgba(192,192,192," + (La ? .002 :
        1E-6) + ")", xa = ia.Math, Ea = xa.ceil, J = xa.floor, Na = xa.max, Oa = xa.min, ka = xa.cos, Aa = xa.sin,
        ya = ia.parseFloat, Qa = ia.parseInt, za;
    ea(pa.eventList, {zoomed: "FC_Zoomed", pinned: "FC_Pinned", resetzoomchart: "FC_ResetZoomChart"});
    Pa("zoomline", {
        friendlyName: "Zoomable and Panable Multi-series Line Chart",
        rendererId: "zoomline",
        standaloneInit: !0,
        hasVDivLine: !0,
        defaultSeriesType: "stepzoom",
        canvasborderthickness: 1,
        defaultPlotShadow: 1,
        chart: function () {
            for (var b = this.base.chart.apply(this, arguments), e = b[oa], h = this.dataObj.chart,
                     f = this.colorManager.getColor("canvasBorderColor"), g = b.chart, w = 0, aa = b.series, u = aa && aa.length || 0, t; u--;) t = aa[u], w = Na(w, t && t.showAnchors && t.attrs && t.attrs.anchors && (t.attrs.anchors.r || 0) + (t.attrs.anchors["stroke-width"] || 0) || 0);
            ea(g, {
                animation: !1,
                zoomType: "x",
                canvasPadding: Na(w, m(h.canvaspadding, 0)),
                overFlowingMarkerWidth: w,
                scrollColor: Ka(ga(h.scrollcolor, this.colorManager.getColor("altHGridColor"))),
                scrollShowButtons: !!m(h.scrollshowbuttons, 1),
                scrollHeight: m(h.scrollheight, 16) || 16,
                scrollBarFlat: e.flatScrollBars,
                allowPinMode: m(h.allowpinmode, 1),
                skipOverlapPoints: m(h.skipoverlappoints, 1),
                showToolBarButtonTooltext: m(h.showtoolbarbuttontooltext, 1),
                btnResetChartTooltext: ga(h.btnresetcharttooltext, "Reset Chart"),
                btnZoomOutTooltext: ga(h.btnzoomouttooltext, "Zoom out one level"),
                btnSwitchToZoomModeTooltext: ga(h.btnswitchtozoommodetooltext, "<strong>Switch to Zoom Mode</strong><br/>Select a subset of data to zoom into it for detailed view"),
                btnSwitchToPinModeTooltext: ga(h.btnswitchtopinmodetooltext, "<strong>Switch to Pin Mode</strong><br/>Select a subset of data and compare with the rest of the view"),
                pinPaneFill: Z(ga(h.pinpanebgcolor, f), m(h.pinpanebgalpha, 15)),
                zoomPaneFill: Z(ga(h.zoompanebgcolor, "#b9d5f1"), m(h.zoompanebgalpha, 30)),
                zoomPaneStroke: Z(ga(h.zoompanebordercolor, "#3399ff"), m(h.zoompaneborderalpha, 80)),
                showPeakData: m(h.showpeakdata, 0),
                maxPeakDataLimit: m(h.maxpeakdatalimit, h.maxpeaklimit, null),
                minPeakDataLimit: m(h.minpeakdatalimit, h.minpeaklimit, null),
                crossline: {
                    enabled: m(h.showcrossline, 1),
                    line: {
                        "stroke-width": m(h.crosslinethickness, 1),
                        stroke: Ka(ga(h.crosslinecolor, "#000000")),
                        "stroke-opacity": m(h.crosslinealpha,
                            20) / 100
                    },
                    labelEnabled: m(h.showcrosslinelabel, h.showcrossline, 1),
                    labelstyle: {
                        fontSize: ya(h.crosslinelabelsize) ? ya(h.crosslinelabelsize) + "px" : e.outCanvasStyle.fontSize,
                        fontFamily: ga(h.crosslinelabelfont, e.outCanvasStyle.fontFamily)
                    },
                    valueEnabled: m(h.showcrosslinevalues, h.showcrossline, 1),
                    valuestyle: {
                        fontSize: ya(h.crosslinevaluesize) ? ya(h.crosslinevaluesize) + "px" : e.inCanvasStyle.fontSize,
                        fontFamily: ga(h.crosslinevaluefont, e.inCanvasStyle.fontFamily)
                    }
                },
                useCrossline: m(h.usecrossline, 1),
                tooltipSepChar: ga(h.tooltipsepchar,
                    ", ")
            });
            return b
        },
        preSeriesAddition: function () {
            var b = this.dataObj, e = b.chart, h = this.hcJSON, f = h[oa], g = this.smartLabel,
                w = m(e.compactdatamode, 0), aa = ga(e.dataseparator, "|"), u = m(e.showlabels, 1),
                t = e.labeldisplay && e.labeldisplay.toLowerCase(), q = u && m(e.labelheight),
                ha = "rotate" === t ? 270 : m(e.rotatelabels, 1) ? 270 : 0, H = h.xAxis.labels.style,
                C = ya(H.lineHeight), L = h.chart.labelPadding = m(e.labelpadding, .2 * C) + h.chart.plotBorderWidth, K,
                N, O, A = 0, D = -1, T, J, Z;
            0 > q && (q = void 0);
            0 > L && (L = (h.chart.plotBorderWidth || 0) + 2);
            K = (K = b.categories) &&
                K[0] || {};
            b = K.category;
            delete K.category;
            h.categories = t = ea({
                data: N = w && b && b.split && b.split(aa) || b || [],
                rotate: ha,
                wrap: "none" !== t
            }, K);
            void 0 !== b && (K.category = b);
            K = N.length || 0;
            if (T = !w && u && 0 !== q && K || 0) {
                for (; T--;) N[T] = N[T] && (O = N[T].label || "") && ((J = O.length) > A && (A = J, D = T, O) || O) || "";
                A && (O = N[D])
            } else if (w && K && !q) if (ha) {
                w = ia.document.createElement("div");
                q = ia.document.createElement("span");
                w.setAttribute("class", "fusioncharts-zoomline-localsmartlabel");
                w.style.cssText = "display:block;width:1px;position:absolute;";
                for (Z in H) w.style[Z] = H[Z];
                q.innerHTML = b.replace(/\s*/g, "").replace(/\{br\}/ig, "<br />").replace(new RegExp(Ia(aa), "g"), " ");
                w.appendChild(q);
                ia.document.body.appendChild(w);
                q = q.offsetWidth || void 0;
                w.parentNode.removeChild(w)
            } else O = N[K - 1] || N[0];
            void 0 !== q && 0 !== q || !u || (O ? (g.setStyle(H), O = g.getSmartText(O), q = ha ? O.width : O.height) : q = C * (ha && 3 || 1));
            q > .3 * f.height && (q = .3 * f.height);
            t.labelHeight = q && q + 6 || 0;
            t.show = q && u || 0;
            t.css = ea({}, H);
            ha ? (t.css.rotation = ha, t.css["text-anchor"] = "end") : t.css["vertical-align"] =
                "top";
            h.xAxis.min = 0;
            h.xAxis.max = K && K - 1 || 0;
            q += m(e.scrollheight, 16) || 16;
            h.chart.marginBottom += L;
            f.marginBottomExtraSpace += q;
            ga(e.caption, e.subcaption) || (f.marginTopExtraSpace += 16)
        },
        series: function () {
            var b = this.dataObj, e = b.chart, h = b.dataset, f = this.hcJSON, E = f[oa], w = E[0], aa = f.series,
                u = m(e.yaxismaxvalue), t = m(e.yaxisminvalue), q = m(e.forceyaxislimits, 0),
                ha = m(e.compactdatamode, 0), H = ga(e.dataseparator, "|"), C = Ia(e.indecimalseparator),
                L = Ia(e.inthousandseparator), K = m(e.drawanchors, e.showanchors, 1), N = !!m(e.showlegend,
                1), O, A, D, T, J, Z = Infinity, da = -Infinity, ba;
            J = f.categories.data.length;
            if (h && h.length && J) {
                C && (C = new RegExp(C, "g"));
                L && (L = new RegExp(L, "g"));
                !L && !C && ha && q && void 0 !== u && void 0 !== t ? (q = !0, da = Na(u, t), Z = Oa(t, u)) : q = !1;
                u = 0;
                for (t = h.length; u < t; u++) {
                    O = h[u];
                    D = O.data;
                    delete O.data;
                    ha ? (T = D || "", L && (T = T.replace(L, "")), C && (T = T.replace(C, ".")), T = T.split(H)) : T = D || [];
                    T.length > J && (T.length = J);
                    ba = T.length;
                    if (ha) {
                        if (!q) for (; ba--;) A = ya(T[ba]), isNaN(A) && (A = void 0), A > da && (da = A), A <= Z && (Z = A), T[ba] = A
                    } else for (; ba--;) A = T[ba] && T[ba].value ||
                        "", L && (A = A.replace(L, "")), C && (A = A.replace(C, ".")), A = ya(A), isNaN(A) && (A = void 0), A > da && (da = A), A <= Z && (Z = A), T[ba] = A;
                    aa.push(A = {
                        index: u,
                        type: "zoomline",
                        data: T,
                        name: O.seriesname || "",
                        showInLegend: O.seriesname && m(O.includeinlegend, 1) && N || !1,
                        showAnchors: m(O.drawanchors, O.showanchors, K),
                        visible: !m(O.initiallyhidden, 0),
                        lineWidth: 2
                    });
                    T.length = J;
                    void 0 !== D && (O.data = D);
                    A.attrs = this.seriesGraphicsAttrs(O);
                    O = A.attrs.anchors;
                    A.color = A.attrs.graphics.stroke;
                    A.ancorRadius = O.r + O["stroke-width"] / 2;
                    A.marker = {
                        fillColor: O.fill,
                        lineColor: O.stroke, lineWidth: 1, symbol: "circle"
                    }
                }
                -Infinity !== da && Infinity !== Z || (da = Z = void 0);
                q = Qa(m(e.displaystartindex, 1), 10) - 1;
                H = Qa(m(e.displayendindex, J || 2), 10) - 1;
                1 > (h = m(e.pixelsperpoint, 15)) && (h = 1);
                (aa = m(e.pixelsperlabel, e.xaxisminlabelwidth, f.categories.rotate ? 20 : 60)) < h && (aa = h);
                (0 > q || q >= (J - 1 || 1)) && (q = 0);
                (H <= q || H > (J - 1 || 1)) && (H = J - 1 || 1);
                f.stepZoom = {
                    cnd: m(e.connectnulldata, 0),
                    amrd: m(e.anchorminrenderdistance, 20),
                    nvl: m(e.numvisiblelabels, 0),
                    cdm: ha,
                    oppp: h,
                    oppl: aa,
                    dsi: q,
                    dei: H,
                    vdl: H - q,
                    dmax: w.max = da,
                    dmin: w.min =
                        Z,
                    clen: J,
                    offset: 0,
                    step: 1,
                    llen: 0,
                    alen: 0,
                    ddsi: q,
                    ddei: H,
                    ppc: 0
                };
                this.configureAxis(f, b);
                b.trendlines && g(b.trendlines, f.yAxis, E, !1, this.isBar)
            }
        },
        seriesGraphicsAttrs: function (b) {
            var e = this.dataObj.chart, h = "0" != (b.dashed || e.linedashed || "0"), g, E, h = {
                "stroke-width": m(b.linethickness, e.linethickness, 2),
                stroke: Ka(ga(b.color, e.linecolor, this.colorManager.getPlotColor())),
                "stroke-opacity": m(b.alpha, e.linealpha, 100) / 100,
                "stroke-dasharray": h ? [m(b.linedashlen, e.linedashlen, 5), m(b.linedashgap, e.linedashgap, 4)] : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round"
            };
            g = ea({}, h);
            E = h["stroke-width"] + m(e.pinlinethicknessdelta, 1);
            g["stroke-width"] = 0 < E && E || 0;
            g["stroke-dasharray"] = [3, 2];
            return {
                graphics: h,
                pin: g,
                shadow: {opacity: h["stroke-opacity"], apply: m(e.showshadow, +!f.vml)},
                anchors: {
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round",
                    r: m(b.anchorradius, e.anchorradius, h["stroke-width"] + 2),
                    stroke: Ka(ga(b.anchorbordercolor, e.anchorbordercolor, h.stroke)),
                    "stroke-opacity": m(b.anchorborderalpha, e.anchorborderalpha, 100) /
                    100,
                    "stroke-width": m(b.anchorborderthickness, e.anchorborderthickness, h["stroke-width"]),
                    fill: Ka(ga(b.anchorbgcolor, e.anchorbgcolor, "#ffffff")),
                    "fill-opacity": m(b.anchorbgalpha, e.anchorbgalpha, 100) / 100,
                    opacity: m(b.anchoralpha, e.anchoralpha, 100) / 100
                },
                anchorShadow: m(e.anchorshadow, e.showshadow, +!f.vml) && {
                    apply: !0,
                    opacity: m(b.anchoralpha, e.anchoralpha, 100) / 100
                }
            }
        },
        eiMethods: {
            zoomOut: function () {
                var b = this.jsVars, e;
                if (b && (e = b.hcObj)) return e.zoomOut && b.hcObj.zoomOut()
            }, zoomTo: function (b, e) {
                var h = this.jsVars,
                    f;
                if (h && (f = h.hcObj)) return f.zoomRange && h.hcObj.zoomRange(b, e)
            }, resetChart: function () {
                var b = this.jsVars, e;
                b && (e = b.hcObj) && (e.pinRangePixels && b.hcObj.pinRangePixels(), e.resetZoom && b.hcObj.resetZoom())
            }, setZoomMode: function (b) {
                var e = this.jsVars, h;
                e && (h = e.hcObj) && h.activatePin && h.activatePin(!b)
            }, getViewStartIndex: function () {
                var b = this.jsVars, e;
                if (b && b.hcObj && (e = b.hcObj._zoominfo)) return e.ddsi
            }, getViewEndIndex: function () {
                var b = this.jsVars, e;
                if (b && b.hcObj && (e = b.hcObj._zoominfo)) return b = e.ddei - 1, (b >=
                e.clen ? e.clen : b) - 1
            }
        }
    }, Pa.msline);
    Ma("renderer.zoomline", {
        resetZoom: function () {
            var b = this._zoomhistory, e = this.options.stepZoom;
            if (!b.length) return !1;
            b.length = 0;
            this.zoomTo(e.dsi, e.dei) && D("zoomReset", this._zoomargs, this.fusionCharts, [this.fusionCharts.id]);
            return !0
        }, zoomOut: function () {
            var b = this._zoomhistory.pop(), e = this.options.stepZoom, h, f, g;
            b ? (h = b.dsi, f = b.dei) : this._prezoomed && (h = 0, f = e.clen - 1);
            (g = this.zoomTo(h, f)) && Da.raiseEvent("zoomedout", g, this.fusionCharts);
            return !0
        }, zoomRangePixels: function (b,
                                      e) {
            var h = this._zoomhistory, f = this._zoominfo, g = f.ppp, f = f.ddsi, m;
            h.push(this._zoominfo);
            (m = this.zoomTo(f + J(b / g), f + J(e / g))) ? Da.raiseEvent("zoomedin", m, this.fusionCharts) : h.pop()
        }, zoomRange: function (b, e) {
            var h = this._zoomhistory, f;
            h.push(this._zoominfo);
            (f = this.zoomTo(+b, +e)) ? Da.raiseEvent("zoomedin", f, this.fusionCharts) : h.pop()
        }, zoomTo: function (b, e) {
            var h = this.xlabels.data, f = this._zoominfo, g = this._zoomhistory, m = f.clen;
            0 > b && (b = 0);
            b >= m - 1 && (b = m - 1);
            e <= b && (e = b + 1);
            e > m - 1 && (e = m - 1);
            if (b === e || b === f.dsi && e === f.dei) return !1;
            this.pinRangePixels();
            f = ea({}, f);
            f.dsi = b;
            f.dei = e;
            f = this._zoominfo = f;
            this.updatePlotZoomline();
            this.zoomOutButton[f.vdl === f.clen - 1 ? "hide" : "show"]();
            this.resetButton[g.length ? "show" : "hide"]();
            this.elements.zoomscroller.attr({
                "scroll-ratio": f.vdl / (m - !!m),
                "scroll-position": [f.dsi / (m - f.vdl - 1), !0]
            });
            h = {level: g.length + 1, startIndex: b, startLabel: h[b], endIndex: e, endLabel: h[e]};
            D("zoomed", h, this.fusionCharts, [this.fusionCharts.id, b, e, h.startLabel, h.endLabel, h.level]);
            return h
        }, activatePin: function (b) {
            var e =
                this._zoominfo, f = this.options.chart, g = this.pinButton;
            if (g && e.pinned ^ (b = !!b)) return b || this.pinRangePixels(), D("zoomModeChanged", {pinModeActive: b}, this.fusionCharts, []), f.showToolBarButtonTooltext && g.tooltip(f[b && "btnSwitchToZoomModeTooltext" || "btnSwitchToPinModeTooltext"] || ""), g.attr("button-active", b), e.pinned = b
        }, pinRangePixels: function (b, e) {
            var f = this.paper, g = this.elements, m = this.xlabels.data, w = this._zoominfo, aa = this.layers.zoompin,
                u = g.pinrect, t = g["clip-pinrect"], q = this._pingrouptransform, J = this.plots,
                H = e - b, C, L;
            if (w && aa && u) {
                if (b === e) return aa.hide(), g.pintracker.hide(), this.pinButton.attr("button-active", !1), w.pinned = !1;
                for (L = J.length; L--;) u = J[L], C = u.pinline, C || (C = u.pinline = f.path(void 0, aa).attr(u.attrPin)), C.attr("path", u.graphic.attrs.path);
                t[0] = b + this.canvasLeft;
                t[2] = H;
                aa.attr({"clip-rect": t, transform: q}).show();
                g.pintracker.__pindragdelta = 0;
                g.pintracker.show().attr({transform: q, x: b, width: H});
                b = this.getValuePixel(b);
                e = this.getValuePixel(e);
                D("pinned", {
                    startIndex: b, endIndex: e, startLabel: m[b],
                    endLabel: m[e]
                }, this.fusionCharts, [this.fusionCharts.id, b, e, m[b], m[e]]);
                return w.pinned = !0
            }
        }, getValuePixel: function (b) {
            var e = this._zoominfo;
            return e.ddsi + J(b / e.ppp)
        }, getParsedLabel: function (b) {
            var e = this.xlabels;
            return e.parsed[b] || (e.parsed[b] = wa(e.data[b] || ""))
        }, drawGraph: function () {
            var b = this, e = b.paper, h = b.canvasLeft, g = b.canvasTop, m = b.canvasWidth, w = b.canvasHeight,
                aa = b.options, u = aa.chart, t = u.plotBorderWidth, q = u.useRoundEdges,
                D = u.showToolBarButtonTooltext, H = u.crossline, C = b.layers, L = b.toolbar, K = b.elements,
                N = u.allowPinMode, O = aa.categories, A = !1, J, T, Z, ga, da, ba, ia;
            ba = b._zoominfo = ea({}, aa.stepZoom);
            b._zoomhistory = [];
            ba.clen && (A = b._prezoomed = ba.dei - ba.dsi < ba.clen - 1, da = b._visw = b.canvasWidth - 2 * u.canvasPadding, ga = b._visx = b.canvasLeft + u.canvasPadding, b._visout = -(b.chartHeight + b.canvasHeight + 1E3), b.base.drawGraph.apply(b, arguments), b._ypvr = b.yAxis[0] && b.yAxis[0].pixelValueRatio || 0, ia = b._ymin || (b._ymin = b.yAxis[0].endY), b._yminValue = b.yAxis[0].min, aa = C.dataset.attr("clip-rect", [b._visx - u.overFlowingMarkerWidth,
                b.canvasTop, b._visw + 2 * u.overFlowingMarkerWidth, b.canvasHeight]), Z = C.scroll || (C.scroll = e.group("scroll").insertAfter(C.layerAboveDataset)), b.xlabels = [], b.xlabels.show = O.show, b.xlabels.height = O.labelHeight, b.xlabels.wrap = O.wrap, b.xlabels.rotate = O.rotate, b.xlabels.data = O.data || [], b.xlabels.parsed = [], b.xlabels.css = O.css, b.xlabels.group = e.group("zoomline-plot-xlabels", C.datalabels), C.datalabels.transform(["T", ga, g + w + u.scrollHeight + u.labelPadding]), b._lcmd = O.rotate ? "y" : "x", N && (N = f.crispBound(0, g - ia, 0, w,
                t), J = K["clip-pinrect"] = [N.x, g, N.width, N.height], T = C.zoompin = e.group("zoompin").insertBefore(aa).transform(b._pingrouptransform = ["T", ga, ia]).hide(), K.pinrect = e.rect(0, g - ia, b._visw, w, C.zoompin).attr({
                "stroke-width": 0,
                stroke: "none",
                fill: u.pinPaneFill,
                "shape-rendering": "crisp",
                ishot: !0
            }), K.pintracker = e.rect(C.tracker).attr({
                transform: T.transform(),
                x: 0,
                y: g - ia,
                width: 0,
                height: w,
                stroke: "none",
                fill: ta,
                ishot: !0,
                cursor: f.svg && "ew-resize" || "e-resize"
            }).drag(function (b) {
                var e = ga + b + this.__pindragdelta, h = this.__pinboundleft,
                    g = this.__pinboundright, q = this.data("cliprect").slice(0);
                e < h ? e = h : e > g && (e = g);
                T.transform(["T", e, ia]);
                K.pintracker.transform(T.transform());
                f.svg || (q[0] = q[0] + e - ga - this.__pindragdelta, T.attr("clip-rect", q));
                this.__pindragoffset = b
            }, function () {
                this.__pinboundleft = 0 - J[0] + ga + h;
                this.__pinboundright = this.__pinboundleft + da - J[2];
                this.data("cliprect", T.attr("clip-rect"));
                T._.clipispath = !0
            }, function () {
                T._.clipispath = !1;
                this.__pindragdelta = this.__pindragoffset;
                delete this.__pindragoffset;
                delete this.__pinboundleft;
                delete this.__pinboundright
            }), b.pinButton = L.add("pinModeIcon", function () {
                b.activatePin(!b._zoominfo.pinned)
            }, {tooltip: D && u.btnSwitchToPinModeTooltext || ""})), t++, N = f.crispBound(h - t, g + w + t, m + t + t, u.scrollHeight, t), t--, K.zoomscroller = e.scroller(N.x + (q && -1 || t % 2), N.y - (q && 4 || 2), N.width - (!q && 2 || 0), N.height, !0, {
                showButtons: u.scrollShowButtons,
                scrollRatio: ba.vdl / (ba.clen - !!ba.clen),
                scrollPosition: [ba.dsi / (ba.clen - ba.vdl - 1), !1],
                displayStyleFlat: u.scrollBarFlat
            }, Z).attr({fill: u.scrollColor, r: q && 2 || 0}).scroll(b.updatePlotZoomline,
                b), q && K.zoomscroller.shadow(!0), function () {
                var e;
                f.eve.on("raphael.scroll.start." + K.zoomscroller.id, function (f) {
                    e = f;
                    b.crossline && b.crossline.disable(!0);
                    Da.raiseEvent("scrollstart", {scrollPosition: f}, b.logic.chartInstance)
                });
                f.eve.on("raphael.scroll.end." + K.zoomscroller.id, function (f) {
                    b.crossline && b.crossline.disable(!1);
                    Da.raiseEvent("scrollend", {prevScrollPosition: e, scrollPosition: f}, b.logic.chartInstance)
                })
            }(), Xa(b, {
                attr: {stroke: u.zoomPaneStroke, fill: u.zoomPaneFill, strokeWidth: 0}, selectionStart: function () {
                },
                selectionEnd: function (e) {
                    var f = e.selectionLeft - h;
                    e = f + e.selectionWidth;
                    b.crossline && b.crossline.hide();
                    b[b._zoominfo.pinned ? "pinRangePixels" : "zoomRangePixels"](f, e)
                }
            }), b.zoomOutButton = L.add("zoomOutIcon", function () {
                b.zoomOut()
            }, {tooltip: D && u.btnZoomOutTooltext || ""})[A && "show" || "hide"](), b.resetButton = L.add("resetIcon", function () {
                b.resetZoom()
            }, {tooltip: D && u.btnResetChartTooltext || ""}).hide(), N = b.resetButton.attr("fill"), N[2] = "rgba(255,255,255,0)", b.resetButton.attr("fill", [N[0], N[1], N[2], N[3]]), H &&
            0 !== H.enabled && 1 === u.useCrossline && (b.crossline = new za(b, H)), b.updatePlotZoomline())
        }, drawPlotZoomline: function (b, e) {
            var f = this.paper, g = e.attrs, m = e.visible, w = m ? "show" : "hide", aa = this.layers.dataset,
                u = b.group || (b.group = f.group("plot-zoomline-dataset", aa)),
                aa = b.anchorGroup || (b.anchorGroup = f.group("plot-zoomline-anchors", aa)),
                f = b.graphic || (b.graphic = f.path(void 0, u)),
                t = ["T", this._visx, this._ymin || (this._ymin = this.yAxis[0].endY)];
            u.transform(t)[w]();
            aa.transform(t)[w]();
            b.graphic = f.attr(g.graphics).shadow(g.shadow);
            b.attrPin = g.pin;
            b.visible = m;
            b.anchors = [];
            b.anchors.show = e.showAnchors;
            b.anchors.attrs = g.anchors;
            b.anchors.attrsShadow = g.anchorShadow;
            b.anchors.left = -(g.anchors.r + .5 * g.anchors["stroke-width"]);
            b.anchors.right = this._visw - b.anchors.right
        }, updatePlotZoomline: function (b, e) {
            var f = this.paper, g = this._ypvr, m = this._visw, w = this.xlabels, aa = w.css, u = w.group,
                t = this.plots, q = this.options.chart.textDirection, D, H, C, L, K, N, O, A;
            !e && (e = this._zoominfo);
            C = e.oppp;
            L = e.vdl = e.dei - e.dsi;
            K = e.ppl = e.nvl ? m / e.nvl : e.oppl;
            m = e.step = (N =
                e.ppp = m / L) < C ? Ea(C / N) : 1;
            C = e.lskip = Ea(Na(K, ya(aa.lineHeight)) / N / m);
            void 0 !== b ? (K = (e.clen - L - 1) * b, e.offset = (K - (K = Qa(K))) * N, L = K + L) : (K = e.dsi, L = e.dei, e.offset = 0);
            O = e.norm = K % m;
            e.ddsi = K -= O;
            e.ddei = L = L + 2 * m - O;
            e.pvr = g;
            e._ymin = this._ymin;
            e._yminValue = this._yminValue;
            g = w.show ? Ea((L - K) / m / C) : 0;
            O = e.llen - 1;
            e.llen = g;
            A = e.ppc = N * C * m;
            if (g > O) for (C = O, O = g; C < O; C++) (D = w[C]) && D.show() || (w[C] = f.text(0, 0, "", u).css(aa).attr({direction: q})); else for (C = g, O += 1; C < O; C++) w[C].hide();
            g = N * m < e.amrd ? 0 : Ea((L - K) / m);
            aa = g - e.alen;
            e.alen = g;
            w.wrap &&
            (w.rotate ? (w._width = w.height, w._height = A) : (w._width = A, w._height = w.height));
            for (D = t.length; D--;) {
                u = t[D];
                e.plotName = u.name || "";
                q = u.anchors;
                if (q.show && aa) {
                    H = q.attrs;
                    C = 0;
                    for (O = g; C < O; C++) q[C] = q[C] && q[C].show() || f.circle(H, u.anchorGroup);
                    C = g;
                    for (O = q.length; C < O; C++) q[C] && q[C].hide()
                }
                this.drawPlotZoomlineGraphics(e, u.data, u.graphic, q, !D && w, H, u.anchorGroup)
            }
            ia.FC_DEV_ENVIRONMENT && ia.jQuery && (FusionCharts["debugger"].enable() ? (this.debug = this.debug || (ia.jQuery("#fc-zoominfo").length || ia.jQuery("body").append('<pre id="fc-zoominfo">'),
                ia.jQuery("#fc-zoominfo").css({
                    position: "absolute",
                    left: "10px",
                    top: "0",
                    "pointer-events": "none",
                    opacity: .7,
                    width: "250px",
                    zIndex: "999",
                    border: "1px solid #cccccc",
                    "box-shadow": "1px 1px 3px #cccccc",
                    background: "#ffffff"
                })), this.debug.text(JSON.stringify(e, 0, 2))) : (this.debug && ia.jQuery("#fc-zoominfo").remove(), delete this.debug))
        }, drawPlotZoomlineGraphics: function (b, e, f, g, m, w, D) {
            var u = this.smartLabel, t = this.paper, q = this.numberFormatter, J = this.options.chart,
                H = J.useCrossline, C = J.showPeakData, L = J.maxPeakDataLimit,
                K = J.minPeakDataLimit, N = [], O = !b.cnd, A = b.ddei, Z = b.clen, T = b.step, ea = b.lskip,
                ga = b.ppp, da = b.offset, ba = b.pvr, ia = this._visw, ka = this._visout, fa = this._lcmd, ma,
                la = "M", oa, pa, ta = m && m[0], za, Aa, ya = g[0], wa = {}, xa = {}, n, Ha, $, ra = 0, Ga, Ca, Da,
                Ea = -b.norm, sa = b.ddsi, a = 0, p, c, d = J.tooltipSepChar, k;
            ta && (m.group.transform(["T", -da, 0]), Da = m.wrap, za = m._height, Aa = m._width, Da && u.setStyle(m.css));
            m = function (a, b) {
                var c = a && a.length, d = Math.max.apply(Math, a), e = Math.min.apply(Math, a), f = 0;
                if (d > L || e < K) for (; f < c;) {
                    e = a[f];
                    if (e > L || e < K) d = b + f,
                        k(e, d, d, !0);
                    f += 1
                }
            };
            for (k = function (f, h, k, m) {
                var r = void 0, u = void 0, l = void 0;
                H || (c = p + d + q.yAxis(f), c = b.plotName && b.plotName + d + c || c);
                Ga = ra / 3 + a;
                Ha = k * ga;
                ma = Ha - da;
                if (void 0 === (oa = e[h])) {
                    if (O) la = "M", n = ka, ma = Ha - da, $ = ka; else {
                        if (0 === Ga) {
                            for (r = h; 0 < r && (--r, u = e[r], void 0 === u);) ;
                            u && (Ha = r * ga * -1, n = ka, N[ra++] = la, N[ra++] = Ha, N[ra++] = $ = (u - b._yminValue) * ba, la = "L")
                        }
                        if (h === A) {
                            for (r = h; r < Z && (r += 1, l = e[r], void 0 === l);) ;
                            l && (Ha = r * ga, n = ka, N[ra++] = la, N[ra++] = Ha, N[ra++] = $ = (l - b._yminValue) * ba, la = "L")
                        }
                    }
                    a++
                } else N[ra++] = la, N[ra++] = n =
                    ma = Ha - da, N[ra++] = $ = (oa - b._yminValue) * ba, la = "L";
                ya && (ya = ya.attr((wa.cx = n, wa.cy = $, wa)).next);
                m && g.push(t.circle(w, D))
            }; sa <= A; sa += T, Ea += T) p = this.getParsedLabel(sa), k(e[sa], sa, Ea), !ta || Ga % ea || (Ca = ta.attrs, pa = p, ma = 0 > ma || ma > ia ? ka : Ha, ta._prevtext === pa ? delete xa.text : xa.text = ta._prevtext = pa, Ca[fa] === ma ? delete xa[fa] : xa[fa] = ma, Da && pa && (xa.text = u.getSmartText(pa, Aa, za).text), ta = ta.attr(xa).next), C && 1 < T && (pa = Oa(sa + 1, A), Ca = Oa(pa + T, A), Ca = Ca === A ? e.slice(pa) : e.slice(pa, Ca), m(Ca, pa));
            A >= Z && ya && ya.attr((wa.cx = ka,
                wa.cy = ka, wa));
            f.attr("path", N);
            H || function (a, b, d) {
                var e = d.plotName;
                f.tooltipListenerAttached || (f.tooltipListenerAttached = !0, f.mousemove(function (d) {
                    var g = a._zoominfo, l = a._visx, k = g.step, n = g.ppp * k;
                    d = Ua(a.container, d).chartX - l;
                    var p, l = J.tooltipSepChar;
                    d = (d += n / 2 + g.offset) - d % n;
                    p = (p = a.getValuePixel(d)) + p % k;
                    c = a.getParsedLabel(p) + l + q.yAxis(b[p]);
                    c = e && e + l + c || c;
                    f.tooltip(c)
                }))
            }(this, e, b)
        }, legendClick: function (b) {
            var e = !b.visible, f = e ? "show" : "hide";
            b.group[f]();
            b.anchorGroup[f]();
            this.base.legendClick.apply(this,
                arguments);
            return b.visible = e
        }, dispose: function () {
            var b;
            this.crossline && (this.crossline.dispose(), delete this.crossline);
            (b = this.elements.pintracker) && (b.undrag(), delete this.elements.pintracker);
            delete this.zoomOutButton;
            delete this.resetButton;
            delete this.pinButton;
            this.xlabels && (this.xlabels.length = 0);
            delete this.xlabels;
            this.base.dispose.apply(this)
        }
    }, Ma["renderer.cartesian"]);
    za = function (b, e) {
        var f = b.paper, g = b.options.chart, m = this.left = b._visx, w = this.width = b._visw,
            D = this.top = b.canvasTop, u = this.height =
                b.canvasHeight, t = this._visout = b._visout, q = this.plots = b.plots, J = b.layers.dataset, H,
            C = e.labelstyle, L = e.valuestyle;
        H = this.group = f.group("crossline-labels", J).attr({transform: ["T", m, b._ymin]});
        this.tracker = f.rect(m, D, w, u, J).attr({
            stroke: "none",
            "stroke-width": 0,
            fill: ta
        }).toFront().mousedown(this.onMouseDown, this).mouseup(this.onMouseUp, this, !0).mouseout(this.onMouseOut, this).mousemove(this.onMouseMove, this);
        Ja && this.tracker.touchstart(this.onMouseMove, this);
        this.container = b.container;
        this.line = f.path(void 0,
            J).attr(ea({path: ["M", m, D, "l", 0, u]}, e.line)).toBack();
        m = this.labels = e.valueEnabled && f.set();
        e.labelEnabled && (this.positionLabel = f.text(t, D + u + (g.scrollHeight || 0) + 2.5, "").insertAfter(b.xlabels.group.parent).css(C).attr({
            "vertical-align": "top",
            direction: g.textDirection,
            "text-bound": ["rgba(255,255,255,1)", "rgba(0,0,0,1)", 1, 2.5]
        }));
        this.hide();
        this.pixelRatio = b._ypvr;
        this.yminValue = b._yminValue;
        this.positionLabels = b.xlabels || {data: [], parsed: []};
        this.getZoomInfo = function () {
            return b._zoominfo
        };
        this.getDataIndexFromPixel =
            function (e) {
                return b.getValuePixel(e)
            };
        this.getPositionLabel = function (e) {
            return b.getParsedLabel(e)
        };
        if (e.valueEnabled) {
            D = 0;
            for (u = q.length; D < u; D++) C = q[D], C = C.graphic.attrs.stroke, m.push(f.text(0, t, "", H).css(L).attr({
                fill: C,
                direction: g.textDirection,
                "text-bound": ["rgba(255,255,255,0.8)", "rgba(0,0,0,0.2)", 1, 2.5]
            }));
            this.numberFormatter = b.numberFormatter
        }
    };
    za.prototype.disable = function (b) {
        void 0 !== b && (this.disabled = !!b) && this.visible && this.hide();
        return this.disabled
    };
    za.prototype.onMouseOut = function () {
        this.hide()
    };
    za.prototype.onMouseDown = function () {
        !Ja && this.hide();
        this._mouseIsDown = !0
    };
    za.prototype.onMouseUp = function () {
        !Ja && this.hide();
        delete this._mouseIsDown
    };
    za.prototype.onMouseMove = function (b) {
        if (!(this.disabled || this._mouseIsDown && !Ja)) {
            var e = this.getZoomInfo(), f = this.line, g = this.left, m = e.step, w = e.ppp * m;
            b = Ua(this.container, b).chartX - g;
            var D;
            b = (b += w / 2 + e.offset) - b % w;
            D = (D = this.getDataIndexFromPixel(Ea(b))) + D % m;
            b -= e.offset;
            f.transform(["T", J(b), 0]);
            this.hidden && this.show();
            if (D !== this.position || this.hidden) this.position =
                D, this.lineX = b, this.updateLabels()
        }
    };
    za.prototype.updateLabels = function () {
        var b = this, e = b.labels, f = b.plots, g = b.width, m = b.position, w = b.lineX, D = J(w), u = b.pixelRatio,
            t = b.yminValue, q = b._visout, Z = b.numberFormatter;
        e && e.forEach(function (e, C) {
            var L = f[C], K = L.data[m], N, O;
            e.attr({text: Z.xAxis(K)});
            N = e.getBBox();
            O = .5 * N.width + 10;
            N = N.height;
            L = void 0 !== K && L.visible ? (K - t) * u : q;
            L < -1 * (b.height - N) ? L += N : L > t * u - N && (L -= N);
            e.attr({x: Na(0, Oa(D, g)), y: L, "text-anchor": w <= O && "start" || w + O >= g && "end" || "middle"})
        });
        b.positionLabel &&
        b.positionLabel.attr({x: w + b.left, text: b.getPositionLabel(m)})
    };
    za.prototype.show = function () {
        this.disabled || (this.hidden = !1, this.group.attr("visibility", "visible"), this.line.attr("visibility", "visible"), this.positionLabel && this.positionLabel.attr("visibility", "visible"))
    };
    za.prototype.hide = function () {
        this.hidden = !0;
        this.group.attr("visibility", "hidden");
        this.line.attr("visibility", "hidden");
        this.positionLabel && this.positionLabel.attr("visibility", "hidden")
    };
    za.prototype.dispose = function () {
        for (var b in this) this.hasOwnProperty(b) &&
        delete this[b]
    };
    f.addSymbol({
        pinModeIcon: function (b, e, f) {
            var g = .5 * f, m = b - f, w = b + f, D = b - g, u = b + g, t = b + .5, q = t + 1, J = t + 1.5, H = e - f,
                C = e + g, L = e - g, g = e + (f - g);
            return ["M", m, H, "L", D, L, D, g, m, C, b - .5, C, b, e + f + .5, t, C, w, C, u, g, u, L, w, H, J, H, J, L, J, g, q, g, q, L, J, L, J, H, "Z"]
        }, zoomOutIcon: function (b, e, g) {
            b -= .2 * g;
            e -= .2 * g;
            var m = .8 * g, E = f.rad(43), w = f.rad(48), D = b + m * ka(E), E = e + m * Aa(E), u = b + m * ka(w),
                w = e + m * Aa(w), t = f.rad(45), q = D + g * ka(t), J = E + g * Aa(t), H = u + g * ka(t);
            g = w + g * Aa(t);
            return ["M", D, E, "A", m, m, 0, 1, 0, u, w, "Z", "M", D + 1, E + 1, "L", q, J, H, g, u + 1, w + 1, "Z",
                "M", b - 2, e, "L", b + 2, e, "Z"]
        }, resetIcon: function (b, e, f) {
            var g = b - f, m = (xa.PI / 2 + xa.PI) / 2;
            b += f * ka(m);
            var m = e + f * Aa(m), w = 2 * f / 3;
            return ["M", g, e, "A", f, f, 0, 1, 1, b, m, "L", b + w, m - 1, b + 2, m + w - .5, b, m]
        }
    })
}]);
