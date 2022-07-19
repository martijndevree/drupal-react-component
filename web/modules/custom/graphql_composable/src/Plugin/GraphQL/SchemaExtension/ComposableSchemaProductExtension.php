<?php

namespace Drupal\graphql_composable\Plugin\GraphQL\SchemaExtension;

use Drupal\graphql\GraphQL\ResolverBuilder;
use Drupal\graphql\GraphQL\ResolverRegistryInterface;
use Drupal\graphql\GraphQL\Response\ResponseInterface;
use Drupal\graphql\Plugin\GraphQL\SchemaExtension\SdlSchemaExtensionPluginBase;
use Drupal\graphql_composable\GraphQL\Response\ProductResponse;

/**
 * @SchemaExtension(
 *   id = "composable_product_extension",
 *   name = "Composable Product extension",
 *   description = "A simple extension that adds node related fields.",
 *   schema = "composable"
 * )
 */
class ComposableSchemaProductExtension extends SdlSchemaExtensionPluginBase {

  /**
   * {@inheritdoc}
   */
  public function registerResolvers(ResolverRegistryInterface $registry): void {
    $builder = new ResolverBuilder();

    $registry->addFieldResolver('Query', 'product',
      $builder->produce('entity_load')
        ->map('type', $builder->fromValue('node'))
        ->map('bundles', $builder->fromValue(['product']))
        ->map('id', $builder->fromArgument('id'))
    );

    // Create product mutation.
//    $registry->addFieldResolver('Mutation', 'createProduct',
//      $builder->produce('create_product')
//        ->map('data', $builder->fromArgument('data'))
//    );

    $registry->addFieldResolver('ProductResponse', 'product',
      $builder->callback(function (ProductResponse $response) {
        return $response->product();
      })
    );

    $registry->addFieldResolver('ProductResponse', 'errors',
      $builder->callback(function (ProductResponse $response) {
        return $response->getViolations();
      })
    );

    $registry->addFieldResolver('Product', 'id',
      $builder->produce('entity_id')
        ->map('entity', $builder->fromParent())
    );

    $registry->addFieldResolver('Product', 'title',
      $builder->compose(
        $builder->produce('entity_label')
          ->map('entity', $builder->fromParent())
      )
    );

    $registry->addFieldResolver('Product', 'price',
      $builder->compose(
        $builder->produce('property_path')
          ->map('type', $builder->fromValue('entity:node'))
          ->map('value', $builder->fromParent())
          ->map('path', $builder->fromValue('field_price.value'))
      )
    );

    $registry->addFieldResolver('Product', 'description',
      $builder->compose(
        $builder->produce('property_path')
          ->map('type', $builder->fromValue('entity:node'))
          ->map('value', $builder->fromParent())
          ->map('path', $builder->fromValue('field_body.value'))
      )
    );

    // Response type resolver.
    $registry->addTypeResolver('Response', [
      __CLASS__,
      'resolveResponse',
    ]);
  }

  /**
   * Resolves the response type.
   *
   * @param \Drupal\graphql\GraphQL\Response\ResponseInterface $response
   *   Response object.
   *
   * @return string
   *   Response type.
   *
   * @throws \Exception
   *   Invalid response type.
   */
  public static function resolveResponse(ResponseInterface $response): string {
    // Resolve content response.
    if ($response instanceof ProductResponse) {
      return 'ProductResponse';
    }
    throw new \Exception('Invalid response type.');
  }

}
