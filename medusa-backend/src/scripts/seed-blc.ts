import { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createInventoryLevelsWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function seedBlcProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION)
  const inventoryModuleService = container.resolve(Modules.INVENTORY)
  const productModuleService = container.resolve(Modules.PRODUCT)

  // ── Resolve existing infrastructure ─────────────────────────────────────
  logger.info("Resolving existing infrastructure...")

  const [defaultSalesChannel] = await salesChannelModuleService.listSalesChannels(
    { name: "Default Sales Channel" }
  )
  if (!defaultSalesChannel) throw new Error("Default Sales Channel not found. Run npm run seed first.")

  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({ type: "default" })
  const shippingProfile = shippingProfiles[0]
  if (!shippingProfile) throw new Error("Default Shipping Profile not found. Run npm run seed first.")

  const [stockLocation] = await stockLocationModuleService.listStockLocations({})
  if (!stockLocation) throw new Error("Stock location not found. Run npm run seed first.")

  // ── Categories — resolve existing or create new ───────────────────────────
  logger.info("Resolving BLC product categories...")
  const categoryDefs = [
    { name: "Compléments", handle: "complements", is_active: true,
      description: "Compléments alimentaires naturels pour drainer et mincir de l'intérieur" },
    { name: "Soins Corps", handle: "soins-corps", is_active: true,
      description: "Crèmes et soins anti-cellulite pour un corps lisse et raffermi" },
    { name: "Exfoliants", handle: "exfoliants", is_active: true,
      description: "Exfoliants corps pour préparer la peau et booster les soins" },
    { name: "Packs", handle: "packs", is_active: true,
      description: "Routines complètes à prix réduit pour des résultats visibles" },
  ]

  // Upsert categories: create only those that don't exist yet
  let categories: any[] = []
  for (const def of categoryDefs) {
    const existing = await productModuleService.listProductCategories(
      { handle: def.handle } as any,
      { select: ["id", "name", "handle"] } as any
    )
    if (existing.length > 0) {
      categories.push(existing[0])
      logger.info(`Category "${def.name}" already exists (handle: ${existing[0].handle}), skipping.`)
    } else {
      try {
        const [created] = await productModuleService.createProductCategories(
          [def], { select: ["id", "name", "handle"] } as any
        )
        categories.push(created)
        logger.info(`Created category "${def.name}".`)
      } catch (e: any) {
        const found = await productModuleService.listProductCategories(
          { handle: def.handle } as any,
          { select: ["id", "name", "handle"] } as any
        )
        if (found.length > 0) categories.push(found[0])
      }
    }
  }

  const getCat = (handle: string) => {
    const cat = categories.find((c: any) => c.handle === handle)
    if (!cat) throw new Error(`Category with handle "${handle}" not found. Categories: ${JSON.stringify(categories.map((c:any) => c.handle))}`)
    return cat.id
  }

  // ── Products — skip handles that already exist ───────────────────────────
  logger.info("Creating BLC products...")
  const blcHandles = ["le-draineur","miracle-cream","miracle-scrub","pack-decouverte","pack-transformation","pack-cure-intensive"]
  const existingProducts = await productModuleService.listProducts({ handle: blcHandles } as any, { select: ["id","handle"] } as any)
  const existingProductHandles = new Set(existingProducts.map((p: any) => p.handle))
  logger.info(`Existing products: ${[...existingProductHandles].join(", ") || "none"}`)

  let products: any[] = [...existingProducts]
  if (existingProductHandles.size === blcHandles.length) {
    logger.info("All products already exist, skipping creation.")
  } else {
  const { result: created } = await createProductsWorkflow(container).run({
    input: {
      products: [
        // ── Le Draineur ───────────────────────────────────────────────────
        {
          title: "Le Draineur",
          handle: "le-draineur",
          subtitle: "Gélules Drainage Lymphatique",
          description:
            "Éliminez l'eau de l'intérieur avec notre formule exclusive à base de 3 plantes naturelles. Jambes légères garanties en 2 semaines. 60 gélules = 1 mois de cure complète. Fabriqué en France par les Laboratoires Lehning.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [getCat("complements")],
          thumbnail:
            "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png",
          images: [
            { url: "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png" },
          ],
          metadata: {
            badge: "bestseller",
            rating: 4.8,
            reviews_count: 247,
            short_description: "Jambes légères en 2 semaines",
            concerns: ["detox", "minceur", "drainage"],
            benefits: [
              "Jambes légères en 2 semaines",
              "Formule 3 plantes naturelles",
              "60 gélules = 1 mois de cure",
            ],
          },
          options: [{ title: "Quantité", values: ["1 boîte", "2 boîtes", "3 boîtes"] }],
          variants: [
            {
              title: "1 boîte – 1 mois",
              sku: "BLC-DRAINEUR-1",
              inventory_quantity: 100,
              options: { Quantité: "1 boîte" },
              prices: [
                { amount: 2500, currency_code: "eur" },
                { amount: 2800, currency_code: "usd" },
              ],
            },
            {
              title: "2 boîtes – 2 mois",
              sku: "BLC-DRAINEUR-2",
              inventory_quantity: 80,
              options: { Quantité: "2 boîtes" },
              prices: [
                { amount: 4500, currency_code: "eur" },
                { amount: 5000, currency_code: "usd" },
              ],
            },
            {
              title: "3 boîtes – 3 mois",
              sku: "BLC-DRAINEUR-3",
              inventory_quantity: 60,
              options: { Quantité: "3 boîtes" },
              prices: [
                { amount: 6300, currency_code: "eur" },
                { amount: 7000, currency_code: "usd" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Miracle Cream ─────────────────────────────────────────────────
        {
          title: "Miracle Cream",
          handle: "miracle-cream",
          subtitle: "Crème Anti-Cellulite",
          description:
            "Lissez et raffermissez votre peau avec notre crème à la bave d'escargot et à la caféine. Réduit la peau d'orange visible dès 4 semaines. Texture légère à pénétration rapide. Vegan, fabriqué en France.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [getCat("soins-corps")],
          thumbnail:
            "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/4szmy6zw_IMG_9684.jpeg",
          images: [
            { url: "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/4szmy6zw_IMG_9684.jpeg" },
          ],
          metadata: {
            badge: "new",
            rating: 4.9,
            reviews_count: 312,
            short_description: "Réduit la peau d'orange visible",
            concerns: ["cellulite", "minceur", "hydratation"],
            benefits: [
              "Réduit la peau d'orange visible",
              "Bave d'escargot + caféine",
              "Texture légère, pénétration rapide",
            ],
          },
          options: [{ title: "Taille", values: ["200ml"] }],
          variants: [
            {
              title: "200ml",
              sku: "BLC-CREAM-200",
              inventory_quantity: 120,
              options: { Taille: "200ml" },
              prices: [
                { amount: 3200, currency_code: "eur" },
                { amount: 3500, currency_code: "usd" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Miracle Scrub ─────────────────────────────────────────────────
        {
          title: "Miracle Scrub",
          handle: "miracle-scrub",
          subtitle: "Exfoliant Corps",
          description:
            "Préparez votre peau pour maximiser l'efficacité de Miracle Cream. Exfolie en douceur grâce aux grains naturels et à la caféine. Améliore la circulation et affine la texture de la peau. À utiliser 2-3x par semaine.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [getCat("exfoliants")],
          thumbnail:
            "https://static.prod-images.emergentagent.com/jobs/00ef226f-f000-474f-89cd-17256bce900b/images/10ceb5c00c04a356de6807ff9cd42f4b7e9073cd34352984ba6cb08bad2fdfb1.png",
          images: [
            { url: "https://static.prod-images.emergentagent.com/jobs/00ef226f-f000-474f-89cd-17256bce900b/images/10ceb5c00c04a356de6807ff9cd42f4b7e9073cd34352984ba6cb08bad2fdfb1.png" },
          ],
          metadata: {
            rating: 4.7,
            reviews_count: 156,
            short_description: "Prépare et exfolie en douceur",
            concerns: ["cellulite", "éclat", "hydratation"],
            benefits: [
              "Exfolie en douceur",
              "Caféine + grains naturels",
              "Prépare à Miracle Cream",
            ],
          },
          options: [{ title: "Taille", values: ["250g"] }],
          variants: [
            {
              title: "250g",
              sku: "BLC-SCRUB-250",
              inventory_quantity: 90,
              options: { Taille: "250g" },
              prices: [
                { amount: 2800, currency_code: "eur" },
                { amount: 3100, currency_code: "usd" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Pack Découverte ───────────────────────────────────────────────
        {
          title: "Pack Découverte",
          handle: "pack-decouverte",
          subtitle: "Drainage interne + soin externe",
          description:
            "Commencez votre transformation avec le duo gagnant : Le Draineur pour drainer de l'intérieur + Miracle Cream pour lisser de l'extérieur. 15% de réduction par rapport à l'achat séparé.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [getCat("packs")],
          thumbnail:
            "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png",
          images: [
            { url: "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png" },
            { url: "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/4szmy6zw_IMG_9684.jpeg" },
          ],
          metadata: {
            badge: "promo",
            rating: 4.8,
            reviews_count: 89,
            short_description: "Le Draineur + Miracle Cream -15%",
            original_price: 5700,
            discount_percent: 15,
            pack_items: ["Le Draineur", "Miracle Cream"],
          },
          options: [{ title: "Pack", values: ["Découverte"] }],
          variants: [
            {
              title: "Pack Découverte",
              sku: "BLC-PACK-DECOUVERTE",
              inventory_quantity: 50,
              options: { Pack: "Découverte" },
              prices: [
                { amount: 4850, currency_code: "eur" },
                { amount: 5300, currency_code: "usd" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Pack Transformation ───────────────────────────────────────────
        {
          title: "Pack Transformation",
          handle: "pack-transformation",
          subtitle: "Programme 3-en-1 complet",
          description:
            "Le programme complet pour une transformation visible : Le Draineur + Miracle Cream + Miracle Scrub. La routine combinée offre les meilleurs résultats. 15% de réduction.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [getCat("packs")],
          thumbnail:
            "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png",
          images: [
            { url: "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png" },
          ],
          metadata: {
            badge: "bestseller",
            rating: 4.9,
            reviews_count: 203,
            short_description: "Le programme 3-en-1 le + populaire",
            original_price: 8500,
            discount_percent: 15,
            pack_label: "Le + populaire",
            pack_items: ["Le Draineur", "Miracle Cream", "Miracle Scrub"],
          },
          options: [{ title: "Pack", values: ["Transformation"] }],
          variants: [
            {
              title: "Pack Transformation",
              sku: "BLC-PACK-TRANSFO",
              inventory_quantity: 40,
              options: { Pack: "Transformation" },
              prices: [
                { amount: 7225, currency_code: "eur" },
                { amount: 8000, currency_code: "usd" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Pack Cure Intensive ───────────────────────────────────────────
        {
          title: "Pack Cure Intensive",
          handle: "pack-cure-intensive",
          subtitle: "Cure complète 3 mois",
          description:
            "Le pack ultime pour une cure complète et des résultats durables : 3x Le Draineur + 2x Miracle Cream + Miracle Scrub. 20% de réduction. Résultats visibles garantis en 28 jours.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [getCat("packs")],
          thumbnail:
            "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png",
          images: [
            { url: "https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png" },
          ],
          metadata: {
            badge: "promo",
            rating: 5.0,
            reviews_count: 67,
            short_description: "Meilleurs résultats garantis",
            original_price: 17900,
            discount_percent: 20,
            pack_label: "Meilleurs résultats",
            pack_items: ["3x Le Draineur", "2x Miracle Cream", "Miracle Scrub"],
          },
          options: [{ title: "Pack", values: ["Cure Intensive"] }],
          variants: [
            {
              title: "Pack Cure Intensive",
              sku: "BLC-PACK-INTENSIVE",
              inventory_quantity: 25,
              options: { Pack: "Cure Intensive" },
              prices: [
                { amount: 14200, currency_code: "eur" },
                { amount: 15500, currency_code: "usd" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
      ],
    },
  })

  products = [...products, ...created]
  logger.info(`Created ${created.length} new products.`)
  } // end if

  // ── Inventory levels — skip existing ──────────────────────────────────────
  logger.info("Setting inventory levels...")
  try {
    const inventoryItems = await inventoryModuleService.listInventoryItems({})
    const existingLevels = await inventoryModuleService.listInventoryLevels({
      location_id: stockLocation.id,
    })
    const existingItemIds = new Set(existingLevels.map((l: any) => l.inventory_item_id))
    const newItems = inventoryItems.filter((item) => !existingItemIds.has(item.id))

    if (newItems.length > 0) {
      await createInventoryLevelsWorkflow(container).run({
        input: {
          inventory_levels: newItems.map((item) => ({
            location_id: stockLocation.id,
            inventory_item_id: item.id,
            stocked_quantity: 100,
          })),
        },
      })
      logger.info(`Set inventory levels for ${newItems.length} items.`)
    } else {
      logger.info("Inventory levels already set, skipping.")
    }
  } catch (e: any) {
    logger.warn(`Inventory levels skipped: ${e.message}`)
  }

  logger.info("✅ BLC seed completed successfully!")
  logger.info(`Created categories: Compléments, Soins Corps, Exfoliants, Packs`)
  logger.info(`Created products: Le Draineur, Miracle Cream, Miracle Scrub + 3 Packs`)
}
