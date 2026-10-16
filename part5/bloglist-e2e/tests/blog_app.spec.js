const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('link', { name: 'login' }).click()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(
        page.getByText('Matti Luukkainen logged in')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Playwright blog', 'Tester', 'http://pw.test/')
      await expect(
        page.getByRole('link', { name: 'Playwright blog Tester' })
      ).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Likeable', 'Tester', 'http://pw.test/')
      await page.getByRole('link', { name: 'Likeable Tester' }).click()
      await expect(
        page.getByRole('heading', { name: 'Likeable Tester' })
      ).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      await createBlog(page, 'Deletable', 'Tester', 'http://pw.test/')
      await page.getByRole('link', { name: 'Deletable Tester' }).click()
      await expect(
        page.getByRole('heading', { name: 'Deletable Tester' })
      ).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', (dialog) => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(
        page.getByRole('link', { name: 'Deletable Tester' })
      ).not.toBeVisible()
    })

    test('only the creator sees the remove button', async ({
      page,
      request,
    }) => {
      await createBlog(page, 'Mine', 'Tester', 'http://pw.test/')

      await request.post('/api/users', {
        data: { name: 'Other User', username: 'other', password: 'sekret2' },
      })
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'other', 'sekret2')

      await page.getByRole('link', { name: 'Mine Tester' }).click()
      await expect(
        page.getByRole('heading', { name: 'Mine Tester' })
      ).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })

    test('blogs are ordered by likes, most liked first', async ({ page }) => {
      await createBlog(page, 'Zero likes', 'Tester', 'http://z.test/')
      await createBlog(page, 'Two likes', 'Tester', 'http://t.test/')
      await createBlog(page, 'One like', 'Tester', 'http://o.test/')

      const likeInView = async (title, times) => {
        await page.getByRole('link', { name: title }).click()
        await expect(page.getByRole('heading', { name: title })).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        for (let i = 0; i < times; i++) {
          await page.getByRole('button', { name: 'like' }).click()
          await expect(page.getByText(`likes ${i + 1}`)).toBeVisible()
        }
        await page.getByRole('link', { name: 'blogs' }).click()
      }

      await likeInView('Two likes Tester', 2)
      await likeInView('One like Tester', 1)

      await expect(page.locator('.blog-summary')).toHaveCount(3)
      const summaries = await page
        .locator('.blog-summary')
        .allTextContents()
      const titles = summaries.map((text) => text.replace(/(view|hide)$/, '').trim())

      expect(titles[0]).toContain('Two likes')
      expect(titles[1]).toContain('One like')
      expect(titles[2]).toContain('Zero likes')
    })
  })
})
