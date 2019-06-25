---
name: SEO
about: Checklist
title: ''
labels: ''
assignees: ''

---

### General

- [ ] Stage site **is not** indexed (use site:my.stage.site.com to check)
- [ ] Production site **is not** indexed **before** launch
- [ ] Production site **is** indexed **after** launch
- [ ] Domains w/ _www_ and w/o _www_ are added but only one is used as primary
- [ ] Site domain is set to _live_ value in database after launch (use --network flag for WordPress network)
- [ ] Site domain is set **only** to _www_ or _non-www_ value in database (use --network flag for WordPress network)
- [ ] Use permalink structure with %postname%
- [ ] 404 page is added and styled
- [ ] HTML is valid
- [ ] Site is mobile friendly (use https://search.google.com/test/mobile-friendly)
- [ ] Check structured data at least on main pages (use https://search.google.com/structured-data/testing-tool)
- [ ] It's possible to set Google Analytics depending on environment
- [ ] WordPress SEO plugin is activated (in priority is Yoast, also possible to use SEOPress etc.)

### Resources

- [ ] Only fonts that are used are loaded with only needed language and characters set
- [ ] Correct image formats are used
- [ ] Correct image sizes are used
- [ ] Responsive images are used

### Content

- [ ] H1 tag is used only once per page and users can not add more from admin panel
- [ ] Meta description is used
- [ ] All external links are opening in new tab or window
- [ ] No duplicate content
- [ ] Images have _alt_ attribute **with** value
- [ ] Use WAI-Aria tags to help machines understand your code, if needed
