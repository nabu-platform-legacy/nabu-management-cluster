application.views.ClusterDashboard = Vue.extend({
	props: ["overview"],
	template: "#clusterDashboard",
	data: function() {
		return {
			created: null,
			overview: null
		};
	},
	created: function() {
		this.created = new Date();
	},
	ready: function() {
		this.drawLine(
			this.getData(this.overview.queries, "load").map(function(a) {
				return a * 100;
			}),
			"load"
		);
		this.drawLine(
			this.getData(this.overview.queries, "heapUsed").map(function(a) {
				return a / (1024 * 1024 * 1024);
			}),
			"heapUsed"
		);
		this.drawLine(
			this.getData(this.overview.queries, "nonHeapUsed").map(function(a) {
				return a / (1024 * 1024);
			}),
			"nonHeapUsed"
		);
	},
	methods: {
		getData: function(list, field) {
			var series = [];
			for (var i = 0; i < list.length; i++) {
				series.push(list[i][field]);
			}
			return series;
		},
		online: function() {
			var latest = this.getLatest();
			if (latest == null) {
				return false;
			}
			var diff = this.created.getTime() - latest.getTime();
			// TODO: currently heartbeat is set to 1 minute, this means 2 minutes at most apart when
			// we allow for 10s variance
			return diff < 130000;
		},
		getLatest: function() {
			var latest = null;
			for (var i = 0; i < this.overview.queries.length; i++) {
				var created = new Date(this.overview.queries[i].created);
				if (latest == null || created > latest) {
					latest = created;
				}
			}
			return latest;
		},
		drawLine: function(series, field) {
			var chart = new Chartist.Line('.' + this.className + "-" + field, {
				//labels: self.labels,
				series: [
					series
				]
			}, {
				showArea: true,
				/*axisX: {
					labelInterpolationFnc: function skipLabels(value, index) {
						var result = index % (value.length / 10.0) === 0 ? value : null;
						return isNaN(result) ? null : result;
					}
				},*/
				showPoint: false,
				fullWidth: true,
	/*			low: 0,*/
				lineSmooth: Chartist.Interpolation.simple({
					divisor: 2
				})
			});
		}
	},
	computed: {
		className: function() {
			return this.overview.host.replace(/[^\w]+/g, "-");
		}
	},
	filters: {
		formatDate: function(value) {
			return value ? value.toLocaleString() : value;
		}
	}
});