var rc = angular.module('reusableComponents', []);

rc.directive('rcCodeViewer', rcCodeViewer);

function rcCodeViewer() {
	return {
		restrict: 'E',
		replace: true,
		transclude: {
			'js': 'jsCode',
			'html': 'htmlCode',
			'css': 'cssCode'
		},
		scope: {
			name: '@'
		},
		template: function(tElem, tAttr){
		return `
		<div class="code-viewer">
			<div class="code-viewer-ribbon">
				<div class="ribbon-btn" ng-click="` + tAttr.name + `Js.toggle()">
					<label class="ribbon-text">JS</label>
				</div>

				<div class="ribbon-btn"
					ng-click="` + tAttr.name + `Html.toggle()"
				>
					<label class="ribbon-text">HTML</label>
				</div>

				<div class="ribbon-btn"
					ng-click="` + tAttr.name + `Css.toggle()"
				>
					<label class="ribbon-text">CSS</label>
				</div>
			</div>

			<div rb-relay
				relay-api="` + tAttr.name + `Js"
				group="` + tAttr.name + `"
				first="true"
				class="code-box"
				ng-class="{
					collapsed: !` + tAttr.name + `Js.isActive(),
					expanded: ` + tAttr.name + `Js.isActive()
				}"
			>
				<prism>
					<pre class="language-javascript">
						<code class="language-javascript" ng-transclude="js">
						</code>
					</pre>
				</prism>
			</div>

			<div rb-relay
				relay-api="` + tAttr.name + `Html"
				group="` + tAttr.name + `"
				class="code-box"
				ng-class="{
					collapsed: !` + tAttr.name + `Html.isActive(),
					expanded: ` + tAttr.name + `Html.isActive()
				}"
			>
				<prism>
					<pre class="language-markup">
						<code class="language-markup" ng-transclude="html">
						</code>
					</pre>
				</prism>
			</div>

			<div rb-relay
				relay-api="` + tAttr.name + `Css"
				group="` + tAttr.name + `"
				class="code-box"
				ng-class="{
					collapsed: !` + tAttr.name + `Css.isActive(),
					expanded: ` + tAttr.name + `Css.isActive()
				}"
			>
				<prism>
					<pre class="language-css">
						<code class="language-css" ng-transclude="css">
						</code>
					</pre>
				</prism>
			</div>
		</div>`;
		},
		link: function (scope, elem, attr) {
		}
	}
}

rc.directive('rcShelf', rcShelf);

function rcShelf() {
	return {
		restrict: 'E',
		replace: true,
		transclude: {
			'title': 'shelfTitle',
			'content': 'shelfContent',
			'rc-code-viewer': 'rcCodeViewer'
		},
		scope: {
			name: '='
		},
		template: function(tElem, tAttr) {
			return `<div class="shelf">
			<label class="shelf-title" ng-transclude="title"></label>
			<div class="code-toggle"
				rb-toggle
				toggle-api="` + tAttr.name + `"
				ng-click="` + tAttr.name + `.toggle()"
			>
				<label class="code-toggle-text">&lt;/&gt;</label>
			</div>
			<div class="shelf-content" ng-transclude="content">
			</div>
			<div ng-transclude="rc-code-viewer"
				class="code-viewer"
				ng-class="{
					collapsed: !` + tAttr.name + `.active,
					expanded: ` + tAttr.name + `.active
				}"
			>
			</div>
		</div>`;
		}
	}
}

rc.directive('rcShelfDrawer', rcShelfDrawer);

function rcShelfDrawer () {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<div class="shelf-drawer"><div class="drawer-content" ng-transclude></div></div>'
	}
}

rc.directive('rcDemoCard', rcDemoCard);

function rcDemoCard () {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			githubLink: '=',
			cardTitle: '@'
		},
		template: function (tElem, tAttr) {
			return `<div class="demo-card">
				<div class="demo-banner">
					<label class="title">` + tAttr.cardTitle + `</label>
					<a href="` + tAttr.githubLink + `" class="demo-card-link"><i class="link-icon fa fa-github"></i></a>
				</div>
				<div class="demo-card-content" ng-transclude></div>
			</div>`;
		},
		link: function () {

		}

	}
}